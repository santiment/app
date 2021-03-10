import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ADDRESS_WATCHLIST_QUERY } from '../../ducks/WatchlistAddressesTable/gql/queries'

const OBJECT = {}
const ARRAY = []

export function useAddressWatchlist (id) {
  const { data, loading } = useQuery(ADDRESS_WATCHLIST_QUERY, {
    variables: { id }
  })

  return {
    watchlist: data ? data.watchlist || OBJECT : OBJECT,
    isLoading: loading
  }
}

const itemAccessor = ({ blockchainAddress }) => blockchainAddress
export const useAddressWatchlistItems = ({ listItems }) =>
  useMemo(() => (listItems ? listItems.map(itemAccessor) : ARRAY), [listItems])
