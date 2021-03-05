import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { client } from '../../../apollo'
import * as Sentry from '@sentry/react'
import { store } from '../../../redux'
import {
  WATCHLIST_SHORT_QUERY,
  USER_WATCHLISTS_QUERY,
  UPDATE_WATCHLIST_MUTATION,
  getRecentWatchlist,
  REMOVE_WATCHLIST_MUTATION
} from './index'
import { PROJECTS_WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'
import { notifyErrorUpdate } from '../Widgets/TopPanel/notifications'
import { useUser } from '../../../stores/user'
import { showNotification } from '../../../actions/rootActions'
import { ADDRESS_WATCHLISTS_QUERY } from './queries'
import { checkIsNotScreener, stringifyFn } from '../../Screener/utils'
import { ADDRESS_WATCHLIST_QUERY } from '../../WatchlistAddressesTable/gql/queries'
import { USER_SHORT_WATCHLISTS_QUERY } from './lists/queries'
import { BLOCKCHAIN_ADDRESS, PROJECT } from '../detector'

const EMPTY_ARRAY = []
const DEFAULT_WATCHLISTS = []

function buildWatchlistsCacheUpdater (reducer) {
  return (cache, { data }) => {
    const watchlist = data.removeWatchlist

    const query =
      watchlist.type === BLOCKCHAIN_ADDRESS
        ? ADDRESS_WATCHLISTS_QUERY
        : USER_SHORT_WATCHLISTS_QUERY(PROJECT)

    const { watchlists } = cache.readQuery({
      query: query
    })

    cache.writeQuery({
      query: query,
      data: { watchlists: reducer(data, watchlists) }
    })
  }
}

function buildWatchlistCacheUpdater (reducer) {
  return (cache, { data }) => {
    const query =
      data.updateWatchlist.type === BLOCKCHAIN_ADDRESS
        ? ADDRESS_WATCHLIST_QUERY
        : PROJECTS_WATCHLIST_QUERY

    const watchlist = cache.readQuery({
      query: query,
      variables: { id: +data.updateWatchlist.id }
    })

    cache.writeQuery({
      query: query,
      variables: { id: +data.updateWatchlist.id },
      data: { watchlist: reducer(data, watchlist) }
    })
  }
}

const updateWatchlistsOnDelete = buildWatchlistsCacheUpdater(
  ({ removeWatchlist }, watchlists) =>
    watchlists.filter(({ id }) => +id !== +removeWatchlist.id)
)

export const updateWatchlistOnEdit = buildWatchlistCacheUpdater(
  ({ updateWatchlist }, watchlist) => ({ ...watchlist, ...updateWatchlist })
)

export function useWatchlist ({ id, skip }) {
  const { data, loading, error } = useQuery(PROJECTS_WATCHLIST_QUERY, {
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
    watchlists ? watchlists.filter(checkIsNotScreener) : DEFAULT_WATCHLISTS,
    loading,
    error
  ]
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

export const useRemovingWatchlist = () => {
  const [mutate, data] = useMutation(REMOVE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnDelete
  })

  function onDelete (id, name) {
    return mutate({
      variables: {
        id: +id
      }
    })
      .then(() => {
        store.dispatch(
          showNotification({
            variant: 'success',
            title: `“${name}” have been successfully deleted`
          })
        )
      })
      .catch(error => {
        Sentry.captureException(error)
      })
  }

  return { onDelete, data }
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

export function getProjectsByFunction (func, query) {
  const { data, loading, error } = useQuery(query, {
    skip: !func,
    fetchPolicy: 'network-only',
    variables: {
      fn: JSON.stringify(func)
    }
  })

  return {
    assets: data ? data.allProjectsByFunction.projects : EMPTY_ARRAY,
    projectsCount: data
      ? data.allProjectsByFunction.stats.projectsCount
      : undefined,
    loading,
    error
  }
}

const extractData = ({ data }) => {
  return {
    assets: data ? data.allProjectsByFunction.projects : EMPTY_ARRAY,
    projectsCount: data && data.allProjectsByFunction.stats.projectsCount
  }
}

export const getAssetsByFunction = (fn, query) =>
  client
    .query({
      fetchPolicy: 'network-only',
      query,
      variables: { fn: stringifyFn(fn) }
    })
    .then(extractData)
