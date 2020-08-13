import { Metric, MetricAlias } from './dataHub/metrics'

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
  return {
    args: {
      filters: filter
    },
    name: 'selector'
  }
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
