import { useQuery } from '@apollo/react-hooks'

import { METRIC } from '../../../Studio/Sidebar/Button/types'
import { DEFAULT_METRICS } from '../../../Studio/withMetrics'
import { SIGNAL_SUPPORTED_METRICS } from '../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/metrics'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../SANCharts/gql'

export function filterOnlyMetrics (submetrics) {
  const result = {}

  Object.keys(submetrics).forEach(key => {
    result[key] = submetrics[key].filter(({ type }) => !type || type === METRIC)
  })

  return result
}

export const getByAvailable = (availableMetrics = DEFAULT_METRICS, trigger) => {
  const { target: { watchlist_id } = {} } = trigger.settings

  if (watchlist_id) {
    return SIGNAL_SUPPORTED_METRICS
  } else {
    return SIGNAL_SUPPORTED_METRICS.filter(({ key }) => {
      return availableMetrics.indexOf(key) !== -1
    })
  }
}

export function useAvailableMetrics (slug) {
  const { data, loading, error } = useQuery(PROJECT_METRICS_BY_SLUG_QUERY, {
    skip: !slug,
    variables: {
      slug
    }
  })

  return [
    data
      ? data.project
      : {
          availableMetrics: DEFAULT_METRICS
        },
    loading,
    error
  ]
}
