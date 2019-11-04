import React, { useState, useEffect } from 'react'
import { setupColorGenerator } from './utils'

const cache = new Map()

const getSyncedColors = metrics => {
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

const TooltipSynchronizer = ({ children, metrics, isMultiChartsActive }) => {
  const [syncedTooltipIndex, syncTooltips] = useState()

  const syncedColors = getSyncedColors(metrics)

  useEffect(() => () => cache.clear(), [])

  return isMultiChartsActive
    ? metrics.map(metric =>
      React.cloneElement(children, {
        isMultiChartsActive,
        key: metric.key,
        metrics: [metric],
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
