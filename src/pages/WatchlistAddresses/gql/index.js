import gql from 'graphql-tag'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalFragment on UserList {
    id
    name
    isPublic
    user {
      id
    }
    listItems {
      blockchainAddress {
        address
        infrastructure
        labels {
          name
          origin
        }
        balanceChange(
          to: "utc_now"
          from: "utc_now-7d"
          selector: { slug: "ethereum" }
        ) {
          balanceChangePercent
          balanceEnd
        }
      }
    }
  }
`

export const WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`

export const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $name: String!
    $description: String
    $isPublic: Boolean
    $listItems: [InputListItem]
  ) {
    createWatchlist(
      name: $name
      description: $description
      isPublic: $isPublic
      listItems: $listItems
    ) {
      ...generalFragment
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`
