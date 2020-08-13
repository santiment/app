import { Metric, MetricAlias } from './dataHub/metrics'
import { DEFAULT_SCREENER_FUNCTION } from '../../utils'

export function getActiveBaseMetrics (filter) {
  const activeMetrics = new Set(
    filter.map(({ args: { metric }, name }) => {
      if (!metric) {
        return Metric[name]
      }

      const transformedMetricIndex = metric.indexOf('_change_')
      const baseMetricKey =
        transformedMetricIndex === -1
          ? metric
          : metric.substring(0, transformedMetricIndex)

      return Metric[baseMetricKey] || MetricAlias[baseMetricKey]
    })
  )

  return [...activeMetrics]
}

export function getNewFunction (filter) {
  return filter.length > 0
    ? {
      args: {
        filters: filter
      },
      name: 'selector'
    }
    : DEFAULT_SCREENER_FUNCTION
}

export const percentServerValueFormatter = value => value / 100
export const percentValueFormatter = value => value * 100

export function isContainMetric (item, key) {
  return item.includes(`${key}_change_`) || item === key
}

// for screeners that created with old way
function reconstructFilters (filters) {
  return filters.map(filter => ({ args: filter, name: 'metric' }))
}

export function extractFilters ({ filters = [] }) {
  if (filters.length === 0) {
    return filters
  }

  if (!filters[0].name && !filters[0].args) {
    return reconstructFilters(filters)
  } else {
    return filters
  }
}
