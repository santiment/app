import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './MetricExplanation.module.scss'

const MetricExplanation = ({
  children,
  label,
  description,
  withChildren = false
}) => {
  return description ? (
    <Tooltip className={styles.explanation} trigger={children}>
      <div className={styles.explanation__content}>
        <div className={styles.visible__scroll}>
          <h4 className={styles.title}>{label}</h4>
          <p className={styles.text}>{description}</p>
        </div>
      </div>
    </Tooltip>
  ) : withChildren ? (
    children
  ) : null
}

export default MetricExplanation
