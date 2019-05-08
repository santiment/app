import React from 'react'
import { Label } from '@santiment-network/ui'
import { formatNumber } from '../../utils/formatting'
import PercentChanges from '../PercentChanges'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({ name, value, label, changes }) => {
  return (
    <article className={styles.metric}>
      <div className={styles.metric__left}>
        <h3 className={styles.metric__name}>{name}</h3>
        <Label className={styles.metric__label} accent='waterloo'>
          ({label})
        </Label>
      </div>
      <div className={styles.metric__right}>
        <span className={styles.metric__value}>{formatNumber(value)}</span>
        <PercentChanges className={styles.metric__changes} changes={changes} />
      </div>
    </article>
  )
}

export default MobileMetricCard
