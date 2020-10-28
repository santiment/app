import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatNumber } from '../../utils/formatting'
import styles from './DashboardCounter.module.scss'

const DashboardCounter = ({
  formatter = formatNumber,
  loadings,
  value,
  title
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>
        {loadings ? (
          <Loader className={styles.loading} />
        ) : (
          formatter(value.toFixed(2))
        )}
      </div>
    </div>
  )
}

export default DashboardCounter
