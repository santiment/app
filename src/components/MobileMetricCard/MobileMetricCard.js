import React from 'react'
import { Label } from '@santiment-network/ui'
import { formatNumber } from '../../utils/formatting'
import PercentChanges from '../PercentChanges'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({ name, value, label, changes, measure = '' }) => {
  return (
    <article className={styles.metric}>
      <div>
        <div>{name}</div>
        <Label accent='waterloo'>({label})</Label>
      </div>
      <div className={styles.right}>
        <span>
          {formatNumber(value)} {measure}
        </span>
        <PercentChanges changes={changes} />
      </div>
    </article>
  )
}

export default MobileMetricCard
