import { useMemo, useState } from 'react'
import { getTransformerKey, useTimeseries } from '../../Studio/timeseries/hooks'
import { updateTooltipSettings } from '../../dataHub/tooltipSettings'
import { CHECKING_STABLECOINS, REQ_META, StablecoinsMetrics } from './utils'

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
        key: getTransformerKey(metric),
        domainGroup: 'stablecoins'
      }))

      updateTooltipSettings(newListMetrics)

      return newListMetrics
    },
    [metrics]
  )
}

export const useStablecoinsTimeseries = settings => {
  const [currentMetric, setMetric] = useState(StablecoinsMetrics[0])

  const {
    metrics,
    settings: currentSettings,
    map: metricsMap,
    transformer: metricsTransformer
  } = useMemo(
    () => {
      const newMetrics = CHECKING_STABLECOINS.map(item => {
        return {
          ...currentMetric,
          ...item
        }
      })

      const map = new Map(
        newMetrics.map(metric => {
          return [
            metric,
            {
              slug: metric.slug,
              ...REQ_META[metric.label]
            }
          ]
        })
      )

      const transformer = newMetrics.reduce((acc, metric) => {
        acc[getTransformerKey(metric)] = v => {
          return v.map(item => ({
            datetime: item.datetime,
            [getTransformerKey(metric)]: item[currentMetric.key]
          }))
        }
        return acc
      }, {})

      return { map, transformer, metrics: newMetrics, settings }
    },
    [CHECKING_STABLECOINS, currentMetric, settings]
  )

  const [data, loadings] = useTimeseries(
    metrics,
    currentSettings,
    metricsMap,
    metricsTransformer
  )

  return {
    data,
    loadings,
    metrics,
    setMetric,
    currentMetric
  }
}
