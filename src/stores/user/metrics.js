import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getMetricByKey } from '../../ducks/Studio/metrics'
import { client } from '../../apollo'

export const USER_SETTINGS_QUERY = gql`
  {
    currentUser {
      id
      settings {
        favoriteMetrics
      }
    }
  }
`

const UPDATE_USER_FAVORIT_METRICS_MUTATION = gql`
  mutation updateUserSettings($metrics: [String]!) {
    updateUserSettings(settings: { favoriteMetrics: $metrics }) {
      favoriteMetrics
    }
  }
`

const QUERY = {
  query: USER_SETTINGS_QUERY
}

const ARRAY = []
const DEFAULT = {
  favoriteMetrics: ARRAY,
  isLoading: true
}

const DEFAULT_LOADED = {
  favoriteMetrics: ARRAY,
  isLoading: false
}
const keyAccessor = ({ key }) => key

let isInFlight = false

export function useFavoriteMetrics () {
  const { data } = useQuery(USER_SETTINGS_QUERY)

  return useMemo(
    () => {
      if (!data) return DEFAULT

      const { currentUser } = data
      if (!currentUser) return DEFAULT_LOADED

      const { favoriteMetrics } = data.currentUser.settings

      return {
        favoriteMetrics: favoriteMetrics.map(getMetricByKey),
        isLoading: false
      }
    },
    [data]
  )
}

function updateFavoriteMetricsCache (_, { data }) {
  const { currentUser } = client.readQuery(QUERY)

  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser: {
        ...currentUser,
        settings: data.updateUserSettings
      }
    }
  })
}

export const mutateFavoriteMetrics = metrics =>
  client.mutate({
    mutation: UPDATE_USER_FAVORIT_METRICS_MUTATION,
    variables: { metrics: metrics.map(keyAccessor) },
    update: updateFavoriteMetricsCache
  })

export function toggleFavoriteMetric (metric) {
  if (isInFlight) return

  isInFlight = true

  return client
    .query(QUERY)
    .then(({ data: { currentUser } }) => {
      if (!currentUser) return

      const favoriteMetricsSet = new Set(
        currentUser.settings.favoriteMetrics.map(getMetricByKey)
      )

      if (favoriteMetricsSet.has(metric)) {
        favoriteMetricsSet.delete(metric)
      } else {
        favoriteMetricsSet.add(metric)
      }

      return mutateFavoriteMetrics([...favoriteMetricsSet])
    })
    .then(() => {
      isInFlight = false
    })
    .catch(console.warn)
}
