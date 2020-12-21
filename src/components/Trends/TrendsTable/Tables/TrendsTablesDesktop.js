import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import TrendsTable from '../../../Tables/Trends/TrendsTable'
import styles from './TrendsTables.module.scss'

const TrendsTablesDesktop = ({
  trends,
  isLoggedIn,
  isLoading,
  trendConnections
}) => {
  const { length } = trends
  return isLoading ? (
    <Loader className={styles.loader} />
  ) : (
    <div className={styles.tables}>
      <TrendsTable
        className={styles.table}
        isLoading={isLoading}
        trendWords={length > 0 ? trends[length - 1].topWords : undefined}
        isLoggedIn={isLoggedIn || true}
        trendConnections={trendConnections}
      />
    </div>
  )
}

export default TrendsTablesDesktop
