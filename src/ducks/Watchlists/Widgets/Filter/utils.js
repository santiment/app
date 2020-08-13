import { Metric, MetricAlias } from './dataHub/metrics'

export function getActiveBaseMetrics (filter) {
  const activeMetrics = new Set(
    filter.map(({ metric }) => {
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
