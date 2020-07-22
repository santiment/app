import React from 'react'
import { Filter } from '../types'
import styles from './index.module.scss'

const Explanation = ({ firstThreshold, timeRange, type, metric }) => {
  if (!firstThreshold) {
    return null
  }

  const badge = Filter[type].badge || metric.badge || ''
  const label = Filter[type].shortLabel || Filter[type].label
  const timeText = Filter[type].showTimeRange
    ? ` compared to ${timeRange} earlier`
    : ''

  return (
    <span
      className={styles.explanation}
    >{`${label} ${firstThreshold}${badge}${timeText}`}</span>
  )
}

export default Explanation
