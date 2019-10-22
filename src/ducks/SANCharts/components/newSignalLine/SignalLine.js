import React from 'react'
import { usdFormatter } from '../../utils'
import pointerImg from './../../../../assets/signals/buttons/pointer.svg'
import styles from './SignalLine.module.scss'

const getSignalText = (priceUsd, isNew) => {
  if (isNew) {
    return (
      <>
        Click to <span className={styles.highline}>create a signal</span> if
        price raises to{' '}
        <span className={styles.highline}>{usdFormatter(priceUsd)}</span>
      </>
    )
  }

  return (
    <>
      Signal if price raises to{' '}
      <span className={styles.highline}>{usdFormatter(priceUsd)}</span>
    </>
  )
}

export const SignalPointSvg = () => (
  <pattern
    id='signalPointerImage'
    x='50%'
    y='10%'
    patternUnits='objectBoundingBox'
    height='1'
    width='1'
  >
    <image x='0' y='0' xlinkHref={pointerImg} />
  </pattern>
)

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
