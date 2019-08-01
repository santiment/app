import React from 'react'
import { formatNumber } from '../../../../../utils/formatting'
import styles from './../signal/TriggerForm.module.scss'

export const LastPriceComponent = ({ lastPrice, slugTitle }) => {
  if (lastPrice === undefined || !slugTitle) return ''

  return (
    <div className={styles.lastPrice}>
      Price 1 {slugTitle.toUpperCase()} ={' '}
      {formatNumber(lastPrice, { currency: 'USD' })}
    </div>
  )
}
