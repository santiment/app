import React from 'react'
import { Filter } from '../../dataHub/types'
import { millify } from '../../../../../../utils/formatting'
import styles from './index.module.scss'

const Explanation = ({
  firstThreshold,
  timeRange,
  type,
  metric,
  customStateText
}) => {
  if (customStateText) {
    return <span className={styles.explanation}>{customStateText}</span>
  }

  if (!firstThreshold) {
    return null
  }

  let label = Filter[type].shortLabel || Filter[type].label
  label = label.toLowerCase()

  const aggregation = metric.aggregation ? `(${metric.aggregation}) ` : ''
  const badge = Filter[type].badge || metric.badge || ''
  const timeText = Filter[type].showTimeRange
    ? ` compared to ${timeRange} earlier`
    : metric.showTimeRange
      ? ` in last ${timeRange}`
      : ''

  return (
    <span className={styles.explanation}>
      {`${aggregation}${label} ${millify(
        firstThreshold,
        10
      )}${badge}${timeText}`}
    </span>
  )
}

export default Explanation
