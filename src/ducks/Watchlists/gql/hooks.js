import { useQuery } from '@apollo/react-hooks'
import {
  WATCHLIST_QUERY,
  WATCHLISTS_QUERY,
  FEATURED_WATCHLISTS_QUERY
} from './index'
import { isStaticWatchlist, isDynamicWatchlist } from '../utils'

const DEFAULT_WATCHLISTS = []

export function useWatchlist (id) {
  const { data, loading, error } = useQuery(WATCHLIST_QUERY, {
    skip: !id,
    variables: {
      id: +id
    }
  })

  return [data ? data.watchlist : undefined, loading, error]
}

export function useUserWatchlists () {
  const { data, loading, error } = useQuery(WATCHLISTS_QUERY)
  const { fetchUserLists: watchlists } = data || {}

  return [
    watchlists ? watchlists.filter(isStaticWatchlist) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
}

export function useUserScreeners () {
  const { data, loading, error } = useQuery(WATCHLISTS_QUERY)
  const { fetchUserLists: watchlists } = data || {}

  return [
    watchlists ? watchlists.filter(isDynamicWatchlist) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
}

export function useFeaturedTemplates () {
  const { data, loading, error } = useQuery(FEATURED_WATCHLISTS_QUERY)

  return [data ? data.watchlists : DEFAULT_WATCHLISTS, loading, error]
}
