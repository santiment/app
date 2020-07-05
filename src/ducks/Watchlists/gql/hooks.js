import { useQuery } from '@apollo/react-hooks'
import {
  WATCHLIST_QUERY,
  USER_WATCHLISTS_QUERY,
  FEATURED_WATCHLISTS_QUERY
} from './index'
import { store } from '../../../index'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
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
  const isLoggedIn = checkIsLoggedIn(store.getState())
  const { data, loading, error } = useQuery(USER_WATCHLISTS_QUERY, {
    skip: !isLoggedIn
  })
  const { fetchUserLists: watchlists } = data || {}

  return [
    watchlists ? watchlists.filter(isStaticWatchlist) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
}

export function useUserScreeners (isLoggedIn) {
  const { data, loading, error } = useQuery(USER_WATCHLISTS_QUERY, {
    skip: !isLoggedIn
  })
  const { fetchUserLists: watchlists } = data || {}

  return [
    watchlists ? watchlists.filter(isDynamicWatchlist) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
}

export function useFeaturedWatchlists () {
  const { data, loading, error } = useQuery(FEATURED_WATCHLISTS_QUERY)
  const { featuredWatchlists: watchlists } = data || {}

  return [watchlists || DEFAULT_WATCHLISTS, loading, error]
}
