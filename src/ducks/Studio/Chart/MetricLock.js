import React, { useMemo } from 'react'
import cx from 'classnames'
import { convertBaseProjectMetric } from '../metrics'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './ActiveMetrics.module.scss'

const LOCKED_TEXT = 'Unlock metric'
const UNLOCKED_TEXT = 'Lock metric to '

const LockIcon = props => (
  <svg width='16' height='17' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6 1h4a2 2 0 012 2v2H4V3c0-1.1.9-2 2-2zM3 5V3a3 3 0 013-3h4a3 3 0 013 3v2h1a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V7c0-1.1.9-2 2-2h1zm10 1H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1h-1zm-5 5a1 1 0 100-2 1 1 0 000 2zm.5.94a2 2 0 10-1 0v1.56a.5.5 0 001 0v-1.56z'
    />
  </svg>
)

const UnlockIcon = props => (
  <svg width='16' height='18' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.25 0A3.25 3.25 0 003.1 2.46l.97.24A2.25 2.25 0 016.25 1H9.5A2.5 2.5 0 0112 3.5V6h1V3.5A3.5 3.5 0 009.5 0H6.25zM14 6H2a2 2 0 00-2 2v8c0 1.1.9 2 2 2h12a2 2 0 002-2V8a2 2 0 00-2-2zm0 1H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1zm-5 4a1 1 0 11-2 0 1 1 0 012 0zm1 0a2 2 0 01-1.5 1.94v1.56a.5.5 0 01-1 0v-1.56A2 2 0 1110 11z'
    />
  </svg>
)

const MetricLock = ({ metrics, metric, project, onClick }) => {
  const isLocked = metric.base
  const explanation = isLocked ? LOCKED_TEXT : UNLOCKED_TEXT + project.ticker
  const Icon = isLocked ? UnlockIcon : LockIcon
  const isDisabled = useMemo(
    () => metrics.includes(convertBaseProjectMetric(metric, project)),
    [metrics, metric, project]
  )

  return (
    <ExplanationTooltip text={explanation}>
      <div
        className={cx(styles.settings__btn, isDisabled && styles.lock_disabled)}
        onClick={isDisabled ? undefined : onClick}
      >
        <Icon />
      </div>
    </ExplanationTooltip>
  )
}

export default MetricLock
