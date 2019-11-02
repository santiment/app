import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { setupColorGenerator } from './utils'
// import styles from './TooltipSynchronizer.module.scss'

const TooltipSynchronizer = ({ children, chartData, metrics }) => {
  const [syncedTooltipIndex, syncTooltips] = useState()

  // TODO: Add memoization for color generator [@vanguard | Nov 02, 2019]
  const generateColor = setupColorGenerator()
  const syncedColors = metrics.reduce((acc, { key, color }) => {
    acc[key] = `var(--${generateColor(color)})`

    return acc
  }, {})

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
