import gql from 'graphql-tag'
import * as Sentry from '@sentry/react'
import { useMutation } from '@apollo/react-hooks'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import { getWatchlistLink } from '../../url'
import { transformToServerType } from '../helpers'
import { stringifyFn } from '../../../Screener/utils'
import { updateWatchlistsOnCreation } from '../cache'
import { SHORT_WATCHLIST_FRAGMENT } from '../fragments'
import {
  notifyCreation,
  notifyErrorCreation
} from '../../Widgets/TopPanel/notifications'

export const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $type: WatchlistTypeEnum
    $name: String!
    $description: String
    $isPublic: Boolean
    $isScreener: Boolean
    $listItems: [InputListItem]
  ) {
    watchlist: createWatchlist(
      type: $type
      name: $name
      description: $description
      isPublic: $isPublic
      isScreener: $isScreener
      listItems: $listItems
    ) {
      ...generalFragment
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
`

export function useCreateWatchlist () {
  const [mutate, data] = useMutation(CREATE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnCreation
  })

  function createWatchlist (props) {
    const { type, function: fn, listItems, name, description, isPublic } = props
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
        notifyErrorCreation(title)
      })
  }

  return [createWatchlist, data]
}
