import { Metric } from './metrics'

export function getActiveBaseMetrics (filter) {
  const activeMetrics = new Set(
    filter.map(({ metric }) => {
      const transformedMetricIndex = metric.indexOf('_change_')
      const baseMetricKey =
        transformedMetricIndex === -1
          ? metric
          : metric.substring(0, transformedMetricIndex)

      return Metric[baseMetricKey]
    })
  )

  return [...activeMetrics]
}

export const percentServerValueFormatter = value => value / 100

export const percentValueFormatter = value => value * 100

export const percentMetricFormatter = ({ metric, timeRange = '1d' }) =>
  `${metric}_change_${timeRange}`
