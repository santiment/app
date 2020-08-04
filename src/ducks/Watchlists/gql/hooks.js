import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  USER_WATCHLISTS_QUERY,
  FEATURED_WATCHLISTS_QUERY,
  CREATE_WATCHLIST_MUTATION,
  UPDATE_WATCHLIST_MUTATION,
  AVAILABLE_METRICS_QUERY,
  PROJECTS_BY_FUNCTION_QUERY
} from './index'
import { WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'
import { store } from '../../../index'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import {
  isStaticWatchlist,
  isDynamicWatchlist,
  DEFAULT_SCREENER,
  DEFAULT_SCREENER_FUNCTION
} from '../utils'

const DEFAULT_WATCHLISTS = []
const DEFAULT_SCREENERS = [DEFAULT_SCREENER]

function buildWatchlistsCacheUpdater (reducer) {
  return (cache, { data }) => {
    const { fetchWatchlists } = cache.readQuery({
      query: USER_WATCHLISTS_QUERY
    })

    cache.writeQuery({
      query: USER_WATCHLISTS_QUERY,
      data: { fetchWatchlists: reducer(data, fetchWatchlists) }
    })
  }
}

function buildWatchlistCacheUpdater (reducer) {
  return (cache, { data }) => {
    const watchlist = cache.readQuery({
      query: WATCHLIST_QUERY,
      variables: { id: +data.updateWatchlist.id }
    })

    cache.writeQuery({
      query: WATCHLIST_QUERY,
      variables: { id: +data.updateWatchlist.id },
      data: { watchlist: reducer(data, watchlist) }
    })
  }
}

const updateWatchlistsOnCreation = buildWatchlistsCacheUpdater(
  ({ createWatchlist }, watchlists) => [createWatchlist].concat(watchlists)
)

const updateWatchlistOnEdit = buildWatchlistCacheUpdater(
  ({ updateWatchlist }, watchlist) => ({ ...watchlist, ...updateWatchlist })
)

export function useWatchlist ({ id, skip }) {
  const { data, loading, error } = useQuery(WATCHLIST_QUERY, {
    skip: !id || skip,
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
  const { fetchWatchlists: watchlists } = data || {}

  return [
    watchlists ? watchlists.filter(isStaticWatchlist) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
}

export function useUserScreeners () {
  const isLoggedIn = checkIsLoggedIn(store.getState())

  if (!isLoggedIn) {
    return [DEFAULT_SCREENERS]
  }
  const { data, loading, error } = useQuery(USER_WATCHLISTS_QUERY, {
    skip: !isLoggedIn
  })
  const { fetchWatchlists: watchlists } = data || {}
  let screeners = []
  if (watchlists && watchlists.length) {
    screeners = watchlists.filter(isDynamicWatchlist)
  }

  return [screeners.length > 0 ? screeners : DEFAULT_SCREENERS, loading, error]
}

export function useFeaturedWatchlists () {
  const { data, loading, error } = useQuery(FEATURED_WATCHLISTS_QUERY)
  const { featuredWatchlists: watchlists } = data || {}

  return [watchlists || DEFAULT_WATCHLISTS, loading, error]
}

export function useCreateScreener () {
  const [mutate, data] = useMutation(CREATE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnCreation
  })

  function createScreener ({ name = 'My Screener', isPublic = false }) {
    const screenerFunction = JSON.stringify(DEFAULT_SCREENER_FUNCTION)

    return mutate({
      variables: {
        name,
        isPublic,
        function: screenerFunction
      }
    }).then(({ data: { createWatchlist } }) => createWatchlist)
  }

  return [createScreener, data]
}

export function useUpdateWatchlist () {
  const [mutate, data] = useMutation(UPDATE_WATCHLIST_MUTATION, {
    update: updateWatchlistOnEdit
  })

  function updateWatchlist (oldWatchlist, newParams) {
    const { id, isPublic, name, function: oldFunction } = oldWatchlist

    return mutate({
      variables: {
        id: +id,
        isPublic:
          newParams.isPublic === undefined ? isPublic : newParams.isPublic,
        name: newParams.name || name,
        function:
          JSON.stringify(newParams.function) || JSON.stringify(oldFunction)
      }
    }).then(({ data: { updateWatchlist: watchlist } }) => ({
      ...oldWatchlist,
      ...watchlist
    }))
  }

  return [updateWatchlist, data]
}

export function useAvailableMetrics () {
  const { data, loading } = useQuery(AVAILABLE_METRICS_QUERY)

  return [data ? data.getAvailableMetrics : [], loading]
}

export function getProjectsByFunction (func) {
  const { data, loading, error } = useQuery(PROJECTS_BY_FUNCTION_QUERY, {
    skip: !func,
    variables: {
      fn: JSON.stringify(func)
    }
  })

  return [
    data ? data.allProjectsByFunction.projects : undefined,
    loading,
    error
  ]
}
