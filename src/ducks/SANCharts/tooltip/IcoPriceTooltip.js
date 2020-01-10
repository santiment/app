import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import styles from './IcoPriceTooltip.module.scss'

const IcoPriceTooltip = ({ value, y }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--y': `${y < 20 ? y + 20 : y}px` }}
    >
      <span>ICO price</span>
      <span className={styles.value}>
        {formatNumber(value, { currency: 'USD' })}
      </span>
    </div>
  )
}

export default IcoPriceTooltip
