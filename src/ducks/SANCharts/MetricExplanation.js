import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import { Event } from '../dataHub/events'
import { Description } from '../dataHub/metrics/descriptions'
import MetricDescription from './MetricDescription/MetricDescription'
import MetricVideoBtn from '../dataHub/metrics/MetricVideoBtn'
import styles from './MetricExplanation.module.scss'

const Note = ({ children }) => (
  <p className={styles.note}>
    <span className={styles.warning}>Important!</span>
    <span className={styles.text}>{children}</span>
  </p>
)

Event.trendPositionHistory.note = <Note>It will disable Anomalies</Note>

const COMPLEXITY_NOTE =
  'The requested period is outside of your plan boundaries'

const MetricExplanation = ({
  metric,
  withChildren = false,
  isComplexityError,
  children,
  project = {},
  ...rest
}) => {
  const { key, label, fullTitle = label, note } = metric
  const description = Description[key]

  if (!description && isComplexityError) {
    return (
      <Tooltip className={styles.explanation} trigger={children} {...rest}>
        <div className={styles.explanation__content}>
          <Note>{COMPLEXITY_NOTE}</Note>
        </div>
      </Tooltip>
    )
  }

  return description ? (
    <Tooltip className={styles.explanation} trigger={children} {...rest}>
      <div className={styles.explanation__content}>
        <h4 className={styles.title}>{fullTitle}</h4>
        <p className={styles.text}>
          <MetricDescription metric={metric} project={project} />
        </p>
        {note && note}
        <MetricVideoBtn metric={metric} />
        {isComplexityError && <Note>{COMPLEXITY_NOTE}</Note>}
      </div>
    </Tooltip>
  ) : withChildren ? (
    children
  ) : null
}

export default MetricExplanation
