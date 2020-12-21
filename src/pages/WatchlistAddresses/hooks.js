import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { WATCHLIST_QUERY } from '../../ducks/WatchlistAddressesTable/gql/queries'
import { useUser } from '../../stores/user'

const OBJECT = {}
const ARRAY = []

export function useAddressWatchlist (id) {
  const { data, loading } = useQuery(WATCHLIST_QUERY, {
    variables: { id }
  })

  return {
    watchlist: data ? data.watchlist || OBJECT : OBJECT,
    isLoading: loading
  }
}

export function useIsWatchlistAuthor (watchlist) {
  const { user } = useUser()
  const userId = user && user.id
  const authorId = watchlist.user && watchlist.user.id
  return userId === authorId
}

const itemAccessor = ({ blockchainAddress }) => blockchainAddress
export const useAddressWatchlistItems = ({ listItems }) =>
  useMemo(() => (listItems ? listItems.map(itemAccessor) : ARRAY), [listItems])
