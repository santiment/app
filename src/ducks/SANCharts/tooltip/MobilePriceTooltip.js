import React from 'react'
import { tooltipValueFormatter } from '../Charts'
import styles from './MobilePriceTooltip.module.scss'

const MobilePriceTooltip = ({
  active,
  payload = [],
  labelFormatter,
  label
}) => {
  const pricePayload = payload.find(({ dataKey }) => dataKey === 'priceUsd')
  const { value, formatter, dataKey } = pricePayload || {}
  return (
    active &&
    pricePayload && (
      <div className={styles.wrapper}>
        <span className={styles.price}>
          {tooltipValueFormatter({ value, key: dataKey, formatter })}
        </span>
        <span className={styles.title}>{labelFormatter(label)}</span>
      </div>
    )
  )
}

export default MobilePriceTooltip
