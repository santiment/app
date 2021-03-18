import gql from 'graphql-tag'
import { client } from '../../../apollo'
import {
  ADDRESSES_LIST_ITEMS_FRAGMENT,
  WATCHLIST_GENERAL_FRAGMENT
} from '../../Watchlists/gql/fragments'

export const ADDRESS_WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${ADDRESSES_LIST_ITEMS_FRAGMENT}
`

const watchlistAccessor = ({ data }) => data.watchlist
export const getAddressWatchlist = (id, fetchPolicy) =>
  client
    .query({ fetchPolicy, query: ADDRESS_WATCHLIST_QUERY, variables: { id } })
    .then(watchlistAccessor)
