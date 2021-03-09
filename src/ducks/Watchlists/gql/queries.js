import gql from 'graphql-tag'
import { BLOCKCHAIN_ADDRESS } from '../utils'
import { SHORT_WATCHLIST_FRAGMENT } from './fragments'
import { useUserWatchlistsLoader } from './lists/queries'
import { SHORT_LIST_ITEMS_FRAGMENT } from '../../WatchlistAddressesTable/gql/queries'

const newWatchlistsQuery = (type, listItemsFragment) => gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists(type: ${type}) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
  ${listItemsFragment}
`

export const ADDRESS_WATCHLISTS_QUERY = newWatchlistsQuery(
  BLOCKCHAIN_ADDRESS,
  SHORT_LIST_ITEMS_FRAGMENT
)
export const useAddressWatchlists = () =>
  useUserWatchlistsLoader(ADDRESS_WATCHLISTS_QUERY)
