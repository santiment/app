import React from 'react'
import { Filter } from '../types'
import { millify } from '../../../../../utils/formatting'
import styles from './index.module.scss'

const Explanation = ({ firstThreshold, timeRange, type, metric }) => {
  if (!firstThreshold) {
    return null
  }

  let label = Filter[type].shortLabel || Filter[type].label
  label = label.toLowerCase()

  const badge = Filter[type].badge || metric.badge || ''
  const timeText = Filter[type].showTimeRange
    ? ` compared to ${timeRange} earlier`
    : ''

  return (
    <span className={styles.explanation}>
      {`${label} ${millify(firstThreshold, 10)}${badge}${timeText}`}
    </span>
  )
}

export default Explanation
