import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  WATCHLIST_SHORT_QUERY,
  USER_WATCHLISTS_QUERY,
  FEATURED_WATCHLISTS_QUERY,
  CREATE_WATCHLIST_MUTATION,
  UPDATE_WATCHLIST_MUTATION,
  AVAILABLE_METRICS_QUERY,
  AVAILABLE_SEGMENTS_QUERY,
  PROJECTS_BY_FUNCTION_QUERY,
  getRecentWatchlist
} from './index'
import { WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'
import {
  countAssetsSort,
  isStaticWatchlist,
  isDynamicWatchlist,
  DEFAULT_SCREENER,
  DEFAULT_SCREENER_FUNCTION
} from '../utils'
import { notifyErrorUpdate } from '../Widgets/TopPanel/notifications'
import { useUser } from '../../../stores/user'

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

export function useShortWatchlist ({ id, skip }) {
  const { data, loading, error } = useQuery(WATCHLIST_SHORT_QUERY, {
    skip: !id || skip,
    variables: {
      id: +id
    }
  })

  return [data ? data.watchlist : undefined, loading, error]
}

export function useUserWatchlists () {
  const { isLoggedIn } = useUser()
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
  const { isLoggedIn } = useUser()

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
  const { featuredWatchlists: watchlists = [] } = data || {}

  const WatchlistIdOrder = {}
  const WATCHLIST_IDS_ORDER = [5496, 5497, 2046, 86, 749, 127, 272]
  WATCHLIST_IDS_ORDER.forEach((id, i) => {
    WatchlistIdOrder[id] = i
  })

  const sortWatchlists = ({ id: a }, { id: b }) =>
    WatchlistIdOrder[a] - WatchlistIdOrder[b]
  const sorter = watchlists => watchlists.sort(sortWatchlists)

  return [sorter(watchlists), loading, error]
}

export function useRecentWatchlists (watchlistsIDs) {
  const [currIDs, setCurrIDs] = useState(watchlistsIDs)
  const [recentWatchlists, setRecentWatchlists] = useState(DEFAULT_WATCHLISTS)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  if (JSON.stringify(watchlistsIDs) !== JSON.stringify(currIDs)) {
    setCurrIDs(watchlistsIDs)
  }

  useEffect(
    () => {
      setIsLoading(true)
      let watchlists = []
      let race = false

      Promise.all(
        watchlistsIDs.map((id, i) =>
          getRecentWatchlist(id).then(watchlist => (watchlists[i] = watchlist))
        )
      )
        .then(data => {
          if (race) return

          watchlists = watchlists.filter(Boolean)

          setRecentWatchlists(watchlists)
          setIsLoading(false)
          setIsError(false)
        })
        .catch(e => {
          if (race) return

          setIsLoading(false)
          setIsError(e)
        })

      return () => (race = true)
    },
    [currIDs]
  )

  return [recentWatchlists, isLoading, isError]
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
    const {
      id,
      isPublic,
      name,
      description,
      function: oldFunction
    } = oldWatchlist

    return mutate({
      variables: {
        id: +id,
        isPublic:
          newParams.isPublic === undefined ? isPublic : newParams.isPublic,
        name: newParams.name || name,
        description: newParams.description || description,
        function:
          JSON.stringify(newParams.function) || JSON.stringify(oldFunction)
      }
    })
      .then(({ data: { updateWatchlist: watchlist } }) => ({
        ...oldWatchlist,
        ...watchlist
      }))
      .catch(notifyErrorUpdate)
  }

  return [updateWatchlist, data]
}

export function useAvailableMetrics () {
  const { data, loading } = useQuery(AVAILABLE_METRICS_QUERY)

  return [data ? data.getAvailableMetrics : [], loading]
}

export function useAvailableSegments () {
  const { data, loading } = useQuery(AVAILABLE_SEGMENTS_QUERY)

  return [data ? data.allMarketSegments.sort(countAssetsSort) : [], loading]
}

export function getProjectsByFunction (func, flag) {
  const { data, loading, error } = useQuery(PROJECTS_BY_FUNCTION_QUERY, {
    skip: !func,
    fetchPolicy: 'network-only',
    variables: {
      fn: JSON.stringify(func)
    }
  })

  return {
    assets: data ? data.allProjectsByFunction.projects : undefined,
    loading,
    error,
    timestamp: new Date()
  }
}
