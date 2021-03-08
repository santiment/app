import gql from 'graphql-tag'
import { client } from '../../../apollo'
import { WATCHLIST_GENERAL_FRAGMENT } from '../../Watchlists/gql/fragments'

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

export const SHORT_LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    stats {
      blockchainAddressesCount
    }
    listItems {
      blockchainAddress {
        address
        infrastructure
      }
    }
  }
`

export const ADDRESS_WATCHLIST_QUERY = gql`
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
    .query({ fetchPolicy, query: ADDRESS_WATCHLIST_QUERY, variables: { id } })
    .then(watchlistAccessor)
