import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  WATCHLIST_QUERY,
  USER_WATCHLISTS_QUERY,
  FEATURED_WATCHLISTS_QUERY,
  CREATE_WATCHLIST_MUTATION,
  UPDATE_WATCHLIST_MUTATION
} from './index'
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
    const { fetchUserLists } = cache.readQuery({ query: USER_WATCHLISTS_QUERY })

    cache.writeQuery({
      query: USER_WATCHLISTS_QUERY,
      data: { fetchUserLists: reducer(data, fetchUserLists) }
    })
  }
}

function buildWatchlistCacheUpdater (reducer) {
  return (cache, { data }) => {
    const watchlist = cache.readQuery({
      query: WATCHLIST_QUERY,
      variables: { id: +data.updateUserList.id }
    })

    cache.writeQuery({
      query: WATCHLIST_QUERY,
      variables: { id: +data.updateUserList.id },
      data: { watchlist: reducer(data, watchlist) }
    })
  }
}

const updateWatchlistsOnCreation = buildWatchlistsCacheUpdater(
  ({ createUserList }, watchlists) => [createUserList].concat(watchlists)
)

const updateWatchlistOnEdit = buildWatchlistCacheUpdater(
  ({ updateUserList }, watchlist) => ({ ...watchlist, ...updateUserList })
)

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

export function useUserScreeners () {
  const isLoggedIn = checkIsLoggedIn(store.getState())

  if (!isLoggedIn) {
    return [DEFAULT_SCREENERS]
  }
  const { data, loading, error } = useQuery(USER_WATCHLISTS_QUERY, {
    skip: !isLoggedIn
  })
  const { fetchUserLists: watchlists } = data || {}
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
    }).then(({ data: { createUserList } }) => createUserList)
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
    }).then(({ data: { updateUserList: watchlist } }) => ({
      ...oldWatchlist,
      ...watchlist
    }))
  }

  return [updateWatchlist, data]
}
