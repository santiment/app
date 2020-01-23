import React, { useState, useEffect } from 'react'
import COLOR from '@santiment-network/ui/variables.scss'
import { findTooltipMetric } from './utils'
import { setupColorGenerator } from '../utils'
import { Metrics } from '../data'

const cache = new Map()

function metricsToPlotCategories (metrics) {
  const requestedData = {
    lines: [],
    daybars: [],
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
      const { label, dataKey = metricAnomalyKey } = Metrics[metricAnomalyKey]
      return {
        key: 'isAnomaly',
        metric: dataKey,
        datetime: date,
        value: label,
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

const Synchronizer = ({ children, metrics, isMultiChartsActive, events }) => {
  const [syncedTooltipDate, syncTooltips] = useState()
  const [syncedEvents, syncEvents] = useState()
  const [syncedCategories, syncCategories] = useState([])

  const syncedColors = getSyncedColors(metrics)
  const noPriceMetrics = metrics.filter(metric => metric !== historyPrice)
  const isValidMulti = isMultiChartsActive && noPriceMetrics.length > 1
  const hasPriceMetric = metrics.length !== noPriceMetrics.length

  useEffect(
    () => {
      const categories = []
      if (isValidMulti) {
        noPriceMetrics.forEach(metric =>
          categories.push(
            metricsToPlotCategories(
              hasPriceMetric ? [metric, historyPrice] : [metric]
            )
          )
        )
      } else {
        categories.push(metricsToPlotCategories(metrics))
      }

      syncCategories(categories)
      syncEvents(prepareEvents(events))
    },
    [metrics]
  )

  useEffect(() => clearCache, [])

  return isValidMulti
    ? syncedCategories.map((categories, i) => {
      const key = getMetricKey(
        hasPriceMetric ? historyPrice : noPriceMetrics[i]
      )

      return React.cloneElement(children, {
        key: i,
        isMultiChartsActive,
        syncedTooltipDate,
        syncedColors,
        syncTooltips,
        hasPriceMetric,
        ...categories,
        tooltipKey: key,
        events: syncedEvents
      })
    })
    : React.cloneElement(children, {
      ...syncedCategories[0],
      syncedColors,
      hasPriceMetric,
      events: syncedEvents,
      tooltipKey: getMetricKey(findTooltipMetric(metrics))
    })
}

function getMetricKey ({ key, dataKey = key }) {
  return dataKey
}

Synchronizer.defaultProps = {
  metrics: []
}

export default Synchronizer
