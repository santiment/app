import gql from 'graphql-tag'
import { client } from '../../../apollo'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalFragment on UserList {
    id
    name
    description
    function
    updatedAt
    insertedAt
    isMonitored
    isPublic
    user {
      id
    }
  }
`

export const LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
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

export const SHORT_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    listItems {
      blockchainAddress {
        address
      }
    }
  }
`

export const WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${LIST_ITEMS_FRAGMENT}
`

const watchlistAccessor = ({ data }) => data.watchlist
export const getAddressWatchlist = (id, fetchPolicy) =>
  client
    .query({ fetchPolicy, query: WATCHLIST_QUERY, variables: { id } })
    .then(watchlistAccessor)
