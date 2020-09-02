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

export function filterMetricsBySearch (value = '', metrics) {
  if (!value) {
    return metrics
  }

  const chars = value.toLowerCase().split('')
  const passedMetrics = []

  metrics.forEach(metric => {
    const str = metric.label.toLowerCase()

    const foundChars = chars.filter(char => str.includes(char))
    if (foundChars.length === chars.length) {
      passedMetrics.push(metric)
    }
  })

  return passedMetrics
}
