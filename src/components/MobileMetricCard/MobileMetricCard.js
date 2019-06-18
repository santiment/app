import React from 'react'
import cx from 'classnames'
import { Label } from '@santiment-network/ui'
import { formatNumber } from '../../utils/formatting'
import PercentChanges from '../PercentChanges'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  name,
  value,
  label,
  changes,
  measure = '',
  anomalies = ''
}) => {
  return (
    <button className={styles.wrapper}>
      <div className={cx(styles.row, styles.row_top)}>
        <h3 className={styles.metric}>{name}</h3>
        <h4 className={styles.value}>
          {formatNumber(value)} {measure}
        </h4>
      </div>
      <div className={styles.row}>
        <h4 className={styles.anomalies}>
          {/* {anomalies && `${anomalies} anomalies`} */}
          25 anomalies
        </h4>
        <div className={styles.right}>
          <PercentChanges changes={changes} />
          <Label accent='casper'>, {label}</Label>
        </div>
      </div>
    </button>
  )
}

export default MobileMetricCard
