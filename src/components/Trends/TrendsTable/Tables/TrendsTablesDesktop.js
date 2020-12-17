import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import TrendsTable from '../../../Tables/Trends/TrendsTable'
import styles from './TrendsTables.module.scss'

const TrendsTablesDesktop = ({
  trends,
  isLoggedIn,
  isLoading,
  selectTrend,
  connectedTrends,
  allTrends,
  trendConnections,
  connectTrends,
  clearConnectedTrends,
  selected,
  selectable
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
        selectable={selectable}
        isLoggedIn={isLoggedIn || true}
        selectTrend={selectTrend}
        selectedTrends={selected}
        connectedTrends={connectedTrends}
        trendConnections={trendConnections}
        connectTrends={connectTrends}
        clearConnectedTrends={clearConnectedTrends}
        allTrends={allTrends}
      />
    </div>
  )
}

export default TrendsTablesDesktop
