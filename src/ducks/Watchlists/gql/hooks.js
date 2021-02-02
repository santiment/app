import React, { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { client } from '../../../apollo'
import * as Sentry from '@sentry/react'
import {
  WATCHLIST_SHORT_QUERY,
  USER_WATCHLISTS_QUERY,
  CREATE_WATCHLIST_MUTATION,
  UPDATE_WATCHLIST_MUTATION,
  AVAILABLE_METRICS_QUERY,
  AVAILABLE_SEGMENTS_QUERY,
  ACCESS_RESTRICTIONS_QUERY,
  getRecentWatchlist,
  REMOVE_WATCHLIST_MUTATION
} from './index'
import { WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'
import {
  countAssetsSort,
  isStaticWatchlist,
  isDynamicWatchlist,
  PROJECT,
  BLOCKCHAIN_ADDRESS,
  DEFAULT_SCREENER,
  DEFAULT_SCREENER_FUNCTION,
  getWatchlistLink,
  getNormalizedListItems,
  getWatchlistAlias
} from '../utils'
import { notifyErrorUpdate } from '../Widgets/TopPanel/notifications'
import { useUser } from '../../../stores/user'
import { showNotification } from '../../../actions/rootActions'
import { store } from '../../../redux'
import { ADDRESS_WATCHLISTS_QUERY } from './queries'
import NotificationActions from '../../../components/NotificationActions/NotificationActions'
import { ADDRESS_WATCHLIST_QUERY } from '../../WatchlistAddressesTable/gql/queries'

const EMPTY_ARRAY = []
const DEFAULT_WATCHLISTS = []
const DEFAULT_SCREENERS = [DEFAULT_SCREENER]

function buildWatchlistsCacheUpdater (reducer) {
  return (cache, { data }) => {
    const watchlist = data.createWatchlist || data.removeWatchlist
    const query =
      watchlist.type === BLOCKCHAIN_ADDRESS
        ? ADDRESS_WATCHLISTS_QUERY
        : USER_WATCHLISTS_QUERY

    const { fetchWatchlists } = cache.readQuery({
      query: query
    })

    cache.writeQuery({
      query: query,
      data: { fetchWatchlists: reducer(data, fetchWatchlists) }
    })
  }
}

function buildWatchlistCacheUpdater (reducer) {
  return (cache, { data }) => {
    const query =
      data.updateWatchlist.type === BLOCKCHAIN_ADDRESS
        ? ADDRESS_WATCHLIST_QUERY
        : WATCHLIST_QUERY

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

const updateWatchlistsOnCreation = buildWatchlistsCacheUpdater(
  ({ createWatchlist }, watchlists) => [createWatchlist].concat(watchlists)
)

const updateWatchlistsOnDelete = buildWatchlistsCacheUpdater(
  ({ removeWatchlist }, watchlists) => {
    return watchlists.filter(({ id }) => +id !== +removeWatchlist.id)
  }
)

export const updateWatchlistOnEdit = buildWatchlistCacheUpdater(
  ({ updateWatchlist }, watchlist) => {
    debugger
    return { ...watchlist, ...updateWatchlist }
  }
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

function getCreationType (type) {
  switch (type) {
    case BLOCKCHAIN_ADDRESS:
      return BLOCKCHAIN_ADDRESS
    case 'screener':
      return PROJECT
    default: {
      return PROJECT
    }
  }
}

export function useCreateWatchlist () {
  const [mutate, data] = useMutation(CREATE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnCreation
  })

  function createWatchlist (props) {
    const { type, function: payloadFunction, listItems = [], ...rest } = props

    const creationType = getCreationType(type)

    const watchlistFunction = JSON.stringify(
      payloadFunction || DEFAULT_SCREENER_FUNCTION
    )

    return mutate({
      variables: {
        ...rest,
        type: creationType,
        function: type === 'screener' ? watchlistFunction : undefined,
        listItems:
          type === 'watchlist' ? getNormalizedListItems(listItems) : undefined
      }
    })
      .then(({ data: { createWatchlist } }) => {
        const { id, name } = createWatchlist

        store.dispatch(
          showNotification({
            title: `New ${getWatchlistAlias(type)} was created`,
            description: (
              <WatchlistNotificationActions
                id={id}
                name={name}
                toLink={getWatchlistLink({ id, name })}
              />
            )
          })
        )

        return createWatchlist
      })
      .catch(error => {
        Sentry.captureException(error)
        store.dispatch(
          showNotification({
            variant: 'error',
            title: 'Error',
            description: `Can't create the ${type}. Please, try again later.`
          })
        )
      })
  }

  return [createWatchlist, data]
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
  const { data: { getAvailableMetrics } = {}, loading } = useQuery(
    AVAILABLE_METRICS_QUERY
  )
  return { availableMetrics: getAvailableMetrics, loading }
}

export function useRestrictedMetrics () {
  const { data, loading } = useQuery(ACCESS_RESTRICTIONS_QUERY)

  return useMemo(
    () => {
      if (data && data.getAccessRestrictions) {
        const allMetrics = []
        const restrictedMetrics = []

        data.getAccessRestrictions.forEach(({ name, type, restrictedFrom }) => {
          allMetrics.push(name)
          if (type === 'metric' && restrictedFrom !== null) {
            restrictedMetrics.push(name)
          }
        })
        return { restrictedMetrics, allMetrics, loading }
      } else {
        return {
          restrictedMetrics: EMPTY_ARRAY,
          allMetrics: EMPTY_ARRAY,
          loading
        }
      }
    },
    [data]
  )
}

export function useAvailableSegments () {
  const { data, loading } = useQuery(AVAILABLE_SEGMENTS_QUERY)

  return useMemo(
    () => [
      data ? data.allMarketSegments.sort(countAssetsSort) : EMPTY_ARRAY,
      loading
    ],
    [data, loading]
  )
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

export const getAssetsByFunction = (func, query) =>
  client
    .query({
      fetchPolicy: 'network-only',
      query,
      variables: { fn: JSON.stringify(func) }
    })
    .then(extractData)

export const WatchlistNotificationActions = ({ id, name, toLink }) => {
  const { onDelete } = useRemovingWatchlist()

  return (
    <NotificationActions
      id={id}
      link={toLink}
      isDialog={false}
      onClick={() => onDelete(id, name)}
    />
  )
}
