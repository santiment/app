import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useIsAuthor } from '../../ducks/Watchlists/gql/list/hooks'
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
export const useAddressWatchlistItems = watchlist => {
  const { listItems, id } = watchlist
  const { isAuthor } = useIsAuthor(watchlist)

  return useMemo(
    () =>
      listItems
        ? listItems.map(item => ({
          isAuthor,
          watchlistId: id,
          ...itemAccessor(item)
        }))
        : ARRAY,
    [listItems, isAuthor]
  )
}
