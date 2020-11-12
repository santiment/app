import React from 'react'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './ActiveMetrics.module.scss'

const LOCKED_TEXT = 'Unlock metric'
const UNLOCKED_TEXT = 'Lock metric to project'

const MetricLock = ({ metric, onClick }) => {
  const isLocked = metric.base
  const explanation = isLocked ? LOCKED_TEXT : UNLOCKED_TEXT

  return (
    <ExplanationTooltip text={explanation}>
      <div className={styles.settings__btn} onClick={onClick}>
        x
      </div>
    </ExplanationTooltip>
  )
}

export default MetricLock
