import gql from 'graphql-tag'
import {
  getListItemsFragment,
  getListItemsShortFragment,
  getStats,
  SHORT_WATCHLIST_FRAGMENT,
  WATCHLIST_GENERAL_FRAGMENT
} from '../fragments'

export const CREATE_WATCHLIST_MUTATION = type => gql`
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
      ...listItemsFragment
      ${getStats(type)}
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
  ${getListItemsShortFragment(type)}
`

export const REMOVE_WATCHLIST_MUTATION = gql`
  mutation removeWatchlist($id: Int!) {
    watchlist: removeWatchlist(id: $id) {
      id
      type
    }
  }
`

export const UPDATE_WATCHLIST_MUTATION = type => gql`
  mutation updateWatchlist(
    $id: Int!
    $name: String
    $function: json
    $isPublic: Boolean
    $description: String
    $isMonitored: Boolean
    $listItems: [InputListItem]
  ) {
    updateWatchlist(
      id: $id
      name: $name
      function: $function
      isPublic: $isPublic
      description: $description
      isMonitored: $isMonitored
      listItems: $listItems
    ) {
      ...generalFragment
      ...listItemsFragment
      tableConfiguration {
        id
        title
        columns
      }
      ${getStats(type)}
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${getListItemsFragment(type)}
`

export const ADD_LIST_ITEMS_MUTATION = type => gql`
  mutation addWatchlistItems(
    $id: Int!
    $listItems: [InputListItem]
  ) {
    addWatchlistItems(
      id: $id
      listItems: $listItems
    ) {
      ...generalFragment
      ...listItemsFragment
      ${getStats(type)}
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${getListItemsFragment(type)}
`

export const REMOVE_LIST_ITEMS_MUTATION = type => gql`
  mutation removeWatchlistItems(
    $id: Int!
    $listItems: [InputListItem]
  ) {
    removeWatchlistItems(
      id: $id
      listItems: $listItems
    ) {
      ...generalFragment
      ...listItemsFragment
      ${getStats(type)}
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${getListItemsFragment(type)}
`
