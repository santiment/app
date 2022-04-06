import React from 'react'
import { tooltipValueFormatter } from '../../dataHub/metrics/formatters'
import styles from './MobilePriceTooltip.module.scss'

const MobilePriceTooltip = ({ active, payload = [], labelFormatter, label }) => {
  if (!payload) {
    return null
  }

  const pricePayload = payload.find(({ dataKey }) => dataKey === 'price_usd')
  const { value, formatter, dataKey } = pricePayload || {}
  return (
    active && (
      <div className={styles.wrapper}>
        <span className={styles.price}>
          {value ? tooltipValueFormatter({ value, key: dataKey, formatter }) : ''}
        </span>
        <span className={styles.date}>{labelFormatter(label)}</span>
      </div>
    )
  )
}

export default MobilePriceTooltip
