import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { client } from '../../../apollo'
import { getRecentWatchlist } from './index'
import {
  PROJECTS_WATCHLIST_QUERY,
  WATCHLIST_VOTES_MUTATION,
  WATHLIST_ITEMS_QUERY
} from '../../../queries/WatchlistGQL'
import { stringifyFn } from '../../Screener/utils'

const EMPTY_ARRAY = []
const DEFAULT_WATCHLISTS = []

export function useWatchlist ({ id, skip }) {
  const { data, loading, error } = useQuery(PROJECTS_WATCHLIST_QUERY, {
    skip: !id || skip,
    variables: {
      id: +id
    }
  })

  return [data ? data.watchlist : undefined, loading, error]
}

export function useWatchlistVoteMutation ({ id }) {
  const [vote, { data }] = useMutation(WATCHLIST_VOTES_MUTATION, {
    refetchQueries: [
      {
        query: PROJECTS_WATCHLIST_QUERY,
        variables: { id: +id }
      }
    ]
  })

  return {
    vote,
    data
  }
}

export function useWatchlistItems (id) {
  const { data, loading, error } = useQuery(WATHLIST_ITEMS_QUERY, {
    skip: !id,
    variables: {
      id: +id
    }
  })

  return useMemo(() => {
    return [
      data
        ? data.watchlist.listItems.map(({ project: { slug } }) => slug)
        : undefined,
      loading,
      error
    ]
  }, [data, loading, error])
}

export function useRecentWatchlists (watchlistsIDs) {
  const [currIDs, setCurrIDs] = useState(watchlistsIDs)
  const [recentWatchlists, setRecentWatchlists] = useState(DEFAULT_WATCHLISTS)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  if (JSON.stringify(watchlistsIDs) !== JSON.stringify(currIDs)) {
    setCurrIDs(watchlistsIDs)
  }

  useEffect(() => {
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
  }, [currIDs])

  return [recentWatchlists, isLoading, isError]
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
