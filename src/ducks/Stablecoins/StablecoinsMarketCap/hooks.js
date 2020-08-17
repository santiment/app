import { useMemo } from 'react'
import { getTransformerKey } from '../../Studio/timeseries/hooks'
import { updateTooltipSettings } from '../../dataHub/tooltipSettings'

export const useMetricColors = metrics => {
  return useMemo(
    () => {
      return metrics.reduce((acc, metric) => {
        acc[getTransformerKey(metric)] = metric.color
        return acc
      }, {})
    },
    [metrics]
  )
}

export const useChartMetrics = metrics => {
  return useMemo(
    () => {
      const newListMetrics = metrics.map(metric => ({
        ...metric,
        key: getTransformerKey(metric)
      }))

      updateTooltipSettings(newListMetrics)

      return newListMetrics
    },
    [metrics]
  )
}
