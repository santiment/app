import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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

const TooltipSynchronizer = ({ children, metrics }) => {
  const [syncedTooltipIndex, syncTooltips] = useState()

  const syncedColors = getSyncedColors(metrics)

  useEffect(() => () => cache.clear(), [])

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      syncedTooltipIndex,
      syncedColors,
      syncTooltips
    })
  )
}

TooltipSynchronizer.defaultProps = {
  children: undefined,
  chartData: undefined,
  metrics: undefined
}

TooltipSynchronizer.propTypes = {
  children: PropTypes.any,
  chartData: PropTypes.any,
  metrics: PropTypes.any
}

export default TooltipSynchronizer
