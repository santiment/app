import React from 'react'
import { Filter } from '../types'
import styles from './index.module.scss'

const Explanation = ({ firstThreshold, timeRange, type, metric }) => {
  if (!firstThreshold) {
    return null
  }

  const badge = Filter[type].badge || metric.badge || ''
  const label = Filter[type].shortLabel || Filter[type].label

  return (
    <span
      className={styles.explanation}
    >{`${label} ${firstThreshold}${badge}`}</span>
  )
}

export default Explanation
