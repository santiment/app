import React, { useState, useEffect } from 'react'
import COLOR from '@santiment-network/ui/variables.scss'
import { setupColorGenerator } from './utils'
import { Metrics } from './data'
import chartStyles from './Chart.module.scss'

const cache = new Map()

function metricsToPlotCategories (metrics) {
  const requestedData = {
    lines: [],
    bars: []
  }

  metrics.forEach(metric => {
    const { key, dataKey = key, node } = metric
    requestedData[node + 's'].push(dataKey)
  })

  return requestedData
}

export const clearCache = () => cache.clear()
export const getSyncedColors = metrics => {
  const cacheKey = metrics.map(({ key }) => key).toString()
  const cachedColors = cache.get(cacheKey)

  if (cachedColors) {
    return cachedColors
  }

  const generateColor = setupColorGenerator()

  const colors = metrics.reduce((acc, { key, dataKey = key, color }) => {
    acc[dataKey] = COLOR[generateColor(color)]
    return acc
  }, {})

  cache.set(cacheKey, colors)
  return colors
}

const { historyPrice } = Metrics

function colorTrend (position) {
  if (position < 4) {
    return COLOR.persimmon
  }
  if (position < 7) {
    return COLOR['texas-rose-hover']
  }

  return COLOR['bright-sun']
}

function prepareEvents (events) {
  return events.map(({ datetime, position, metricAnomalyKey }) => {
    const date = +new Date(datetime)
    if (metricAnomalyKey) {
      return {
        key: 'isAnomaly',
        metric: metricAnomalyKey,
        datetime: date,
        value: true,
        color: COLOR.persimmon
      }
    }

    const color = colorTrend(position)
    return {
      key: 'trendingPosition',
      metric: 'priceUsd',
      datetime: date,
      value: [position, color],
      color
    }
  })
}

const TooltipSynchronizer = ({
  children,
  metrics,
  isMultiChartsActive,
  events
}) => {
  const [syncedTooltipIndex, syncTooltips] = useState()

  const syncedColors = getSyncedColors(metrics)

  const noPriceMetrics = metrics.filter(metric => metric !== historyPrice)
  const hasPriceMetric = metrics.length !== noPriceMetrics.length
  const syncedMetrics = metrics.reduce((map, metric) => {
    map.set(metric, hasPriceMetric ? [metric, historyPrice] : [metric])
    return map
  }, new WeakMap())
  const { lines, bars } = metricsToPlotCategories(metrics)
  const prepEvents = prepareEvents(events)

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
    : React.cloneElement(children, {
      metrics,
      syncedColors,
      lines,
      bars,
      events: prepEvents
    })
}

TooltipSynchronizer.defaultProps = {
  metrics: []
}

export default TooltipSynchronizer
