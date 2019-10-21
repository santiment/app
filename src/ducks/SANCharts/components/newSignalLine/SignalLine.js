import React from 'react'
import { usdFormatter } from '../../utils'
import styles from './SignalLine.module.scss'

const getSignalText = (priceUsd, isNew) => {
  if (isNew) {
    return (
      <div>
        Click to <span className={styles.highline}>create a signal</span> if
        price raises to{' '}
        <span className={styles.highline}>{usdFormatter(priceUsd)}</span>
      </div>
    )
  }

  return (
    <div>
      Signal: price raises to{' '}
      <span className={styles.highline}>{usdFormatter(priceUsd)}</span>
    </div>
  )
}

const SignalLine = ({ active, data }) => {
  if (!data && !active) {
    return null
  }

  const { priceUsd, chartY, isNew } = data || active

  if (!priceUsd) {
    return null
  }

  const text = getSignalText(priceUsd, isNew)

  return (
    <div
      className={styles.container}
      style={{
        '--y': `${chartY}px`
      }}
    >
      <div className={styles.tooltip}>{text}</div>
      <div className={styles.line} />
    </div>
  )
}

export default SignalLine
