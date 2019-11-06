import React from 'react'
import { usdFormatter } from '../../../SANCharts/utils'
import pointerImg from '../../../../assets/signals/buttons/pointer.svg'
import { PRICE_CHANGE_TYPES } from '../../utils/constants'
import styles from './SignalLine.module.scss'
import { getOperationType } from '../../utils/utils'

const getSignalText = (priceUsd, type, isNew) => {
  const priceTypeText =
    type === PRICE_CHANGE_TYPES.ABOVE
      ? 'price raises above'
      : 'price drops below'

  if (isNew) {
    return (
      <>
        Click to <span className={styles.highline}>create a signal</span> if{' '}
        {priceTypeText}{' '}
        <span className={styles.highline}>{usdFormatter(priceUsd)}</span>
      </>
    )
  }

  return (
    <>
      Signal if {priceTypeText}{' '}
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

const SignalLine = ({ data = {} }) => {
  if (!data) {
    return null
  }

  const { priceUsd, lastPrice, chartY, signal } = data

  if (!priceUsd) {
    return null
  }

  const newType =
    lastPrice >= priceUsd ? PRICE_CHANGE_TYPES.BELOW : PRICE_CHANGE_TYPES.ABOVE
  const type = !signal ? newType : getOperationType(signal.settings.operation)

  const text = getSignalText(priceUsd, type, !signal)

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
