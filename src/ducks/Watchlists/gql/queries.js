import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { SHORT_WATCHLIST_FRAGMENT } from './fragments'
import { BLOCKCHAIN_ADDRESS } from '../utils'
import { SHORT_LIST_ITEMS_FRAGMENT } from '../../WatchlistAddressesTable/gql/queries'

const ARRAY = []

export const newWatchlistsQuery = (
  type,
  generalFragment,
  listItemsFragment
) => gql`
  query fetchWatchlists {
    fetchWatchlists(type: ${type}) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${generalFragment}
  ${listItemsFragment}
`

export const ADDRESS_WATCHLISTS_QUERY = newWatchlistsQuery(
  BLOCKCHAIN_ADDRESS,
  SHORT_WATCHLIST_FRAGMENT,
  SHORT_LIST_ITEMS_FRAGMENT
)

function useWatchlists (query) {
  const { data, loading } = useQuery(query)
  return {
    watchlists: data ? data.fetchWatchlists : ARRAY,
    isLoading: loading
  }
}

export const useAddressWatchlists = () =>
  useWatchlists(ADDRESS_WATCHLISTS_QUERY)
