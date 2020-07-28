import { Metric, MetricAlias } from './metrics'
import { DEFAULT_SCREENER_FUNCTION } from '../../utils'

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
