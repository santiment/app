import gql from 'graphql-tag'
import { ADDRESS_WATCHLISTS_QUERY } from './queries'
import { client } from '../../../apollo'
import {
  SHORT_LIST_ITEMS_FRAGMENT,
  SHORT_WATCHLIST_GENERAL_FRAGMENT
} from '../../WatchlistAddressesTable/gql/queries'
import { normalizeItems } from './helpers'
import { BLOCKCHAIN_ADDRESS, PROJECT } from '../utils'
import { updateWatchlistOnEdit } from './hooks'

export const UPDATE_WATCHLIST_SHORT_MUTATION = gql`
  mutation updateWatchlist(
    $id: Int!
    $isPublic: Boolean
    $name: String
    $description: String
    $function: json
    $listItems: [InputListItem]
  ) {
    updateWatchlist(
      id: $id
      isPublic: $isPublic
      name: $name
      description: $description
      function: $function
      listItems: $listItems
    ) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${SHORT_WATCHLIST_GENERAL_FRAGMENT}
  ${SHORT_LIST_ITEMS_FRAGMENT}
`

export const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $type: WatchlistTypeEnum
    $name: String!
    $description: String
    $isPublic: Boolean
    $listItems: [InputListItem]
  ) {
    createWatchlist(
      type: $type
      name: $name
      description: $description
      isPublic: $isPublic
      listItems: $listItems
    ) {
      ...generalFragment
    }
  }
  ${SHORT_WATCHLIST_GENERAL_FRAGMENT}
`

const removeTypename = ({ __typename, ...rest }) => rest
function normalizeListItems ({ listItems, ...rest }) {
  const newListItems =
    listItems &&
    listItems.map(item => {
      const newItem = removeTypename(item)
      Object.keys(newItem).forEach(key => {
        newItem[key] = removeTypename(newItem[key])
      })
      return newItem
    })

  return { ...rest, listItems: newListItems }
}

export const updateWatchlistShort = variables =>
  client.mutate({
    mutation: UPDATE_WATCHLIST_SHORT_MUTATION,
    update: updateWatchlistOnEdit,
    variables: normalizeListItems(variables)
  })

const watchlistCreator = type => ({ name, description, isPublic, listItems }) =>
  client
    .mutate({
      update: updateWatchlistsOnCreation,
      mutation: CREATE_WATCHLIST_MUTATION,
      variables: {
        type,
        name,
        description,
        isPublic,
        listItems: listItems && normalizeItems(listItems)
      }
    })
    .then(({ data }) => data.createWatchlist)

function updateWatchlistsOnCreation (cache, { data: { createWatchlist } }) {
  const { fetchWatchlists } = cache.readQuery({
    query: ADDRESS_WATCHLISTS_QUERY
  })

  cache.writeQuery({
    query: ADDRESS_WATCHLISTS_QUERY,
    data: {
      fetchWatchlists: fetchWatchlists.concat([
        { ...createWatchlist, listItems: [] }
      ])
    }
  })
}

export const createProjectsWatchlist = watchlistCreator(PROJECT)
export const createAddressesWatchlist = watchlistCreator(BLOCKCHAIN_ADDRESS)
