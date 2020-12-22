import gql from 'graphql-tag'
import { WATCHLIST_GENERAL_FRAGMENT, LIST_ITEMS_FRAGMENT } from './queries'

export const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $name: String!
    $description: String
    $isPublic: Boolean
    $listItems: [InputListItem]
    $type: WatchlistTypeEnum
  ) {
    createWatchlist(
      name: $name
      description: $description
      isPublic: $isPublic
      listItems: $listItems
      type: $type
    ) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${LIST_ITEMS_FRAGMENT}
`
