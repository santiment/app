import React, { useState, useEffect } from 'react'
import { setupColorGenerator } from './utils'
import { Metrics } from './data'
import chartStyles from './Chart.module.scss'

const cache = new Map()

export const clearCache = () => cache.clear()
export const getSyncedColors = metrics => {
  const cacheKey = metrics.map(({ key }) => key).toString()
  const cachedColors = cache.get(cacheKey)

  if (cachedColors) {
    return cachedColors
  }

  const generateColor = setupColorGenerator()

  const colors = metrics.reduce((acc, { key, color }) => {
    acc[key] = `var(--${generateColor(color)})`

    return acc
  }, {})

  cache.set(cacheKey, colors)
  return colors
}

const { historyPrice } = Metrics

const TooltipSynchronizer = ({ children, metrics, isMultiChartsActive }) => {
  const [syncedTooltipIndex, syncTooltips] = useState()

  const syncedColors = getSyncedColors(metrics)

  const noPriceMetrics = metrics.filter(metric => metric !== historyPrice)
  const hasPriceMetric = metrics.length !== noPriceMetrics.length
  const syncedMetrics = metrics.reduce((map, metric) => {
    map.set(metric, hasPriceMetric ? [metric, historyPrice] : [metric])
    return map
  }, new WeakMap())

  useEffect(() => clearCache, [])

  return isMultiChartsActive && noPriceMetrics.length > 1
    ? noPriceMetrics.map(metric =>
      React.cloneElement(children, {
        className: chartStyles.multiCharts,
        isMultiChartsActive,
        key: metric.key,
        metrics: syncedMetrics.get(metric),
        syncedTooltipIndex,
        syncedColors,
        syncTooltips
      })
    )
    : React.cloneElement(children, { metrics, syncedColors })
}

TooltipSynchronizer.defaultProps = {
  metrics: []
}

export default TooltipSynchronizer
