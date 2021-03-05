import gql from 'graphql-tag'
import * as Sentry from '@sentry/react'
import { useMutation } from '@apollo/react-hooks'
import { history } from '../../../../redux'
import { getWatchlistLink } from '../../url'
import { stringifyFn } from '../../../Screener/utils'
import { updateWatchlistsOnCreation, updateWatchlistsOnDelete } from '../cache'
import { SHORT_WATCHLIST_FRAGMENT } from '../fragments'
import { normalizeItems, transformToServerType } from '../helpers'
import {
  BLOCKCHAIN_ADDRESS,
  getTitleByWatchlistType,
  PROJECT,
  SCREENER
} from '../../detector'
import {
  notifyCreation,
  notifyDeletion,
  notifyError
} from '../../Widgets/TopPanel/notifications'

const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $type: WatchlistTypeEnum
    $name: String!
    $description: String
    $isPublic: Boolean
    $isScreener: Boolean
    $function: json
    $listItems: [InputListItem]
  ) {
    watchlist: createWatchlist(
      type: $type
      name: $name
      description: $description
      isPublic: $isPublic
      function: $function
      isScreener: $isScreener
      listItems: $listItems
    ) {
      ...generalFragment
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
`

const REMOVE_WATCHLIST_MUTATION = gql`
  mutation removeWatchlist($id: Int!) {
    watchlist: removeWatchlist(id: $id) {
      id
      name
      type
    }
  }
`

export function useCreateWatchlist (type) {
  const [mutate, data] = useMutation(CREATE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnCreation
  })

  function createWatchlist (props) {
    const { function: fn, listItems, name, description, isPublic } = props
    return mutate({
      variables: {
        type: transformToServerType(type),
        name,
        isPublic,
        description,
        isScreener: type === SCREENER,
        function: type === SCREENER ? stringifyFn(fn) : undefined,
        listItems: normalizeItems(listItems, type)
      }
    })
      .then(({ data: { watchlist } }) => {
        const link = getWatchlistLink(watchlist)
        const title = getTitleByWatchlistType(type)
        const { openOnSuccess } = props

        notifyCreation(title, !openOnSuccess && link)

        if (openOnSuccess) {
          history.push(link)
        }

        return watchlist
      })
      .catch(error => {
        Sentry.captureException(error)
        notifyError(getTitleByWatchlistType(type), 'create')
      })
  }

  return [createWatchlist, data]
}

export function useRemoveWatchlist (type) {
  const [mutate, data] = useMutation(REMOVE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnDelete
  })

  function onDelete (id, name) {
    return mutate({ variables: { id: +id } })
      .then(() => notifyDeletion(name))
      .catch(error => {
        Sentry.captureException(error)
        notifyError(getTitleByWatchlistType(type), 'delete')
      })
  }

  return { onDelete, data }
}

export const useCreateProjectWatchlist = () => useCreateWatchlist(PROJECT)
export const useCreateScreener = () => useCreateWatchlist(SCREENER)
export const useCreateAddressesWatchlist = () =>
  useCreateWatchlist(BLOCKCHAIN_ADDRESS)
