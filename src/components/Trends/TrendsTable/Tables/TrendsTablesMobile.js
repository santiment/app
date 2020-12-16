import React from 'react'
import TrendsTable from '../TrendsTable'
import styles from './TrendsTables.module.scss'

const TrendsTablesMobile = ({
  trends,
  clearConnectedTrends,
  isLoggedIn,
  connectedTrends,
  selectTrend,
  connectTrends,
  trendConnections,
  oldSelected,
  selectable,
  allTrends
}) => {
  if (!trends.length) {
    return null
  }

  const { topWords } = trends[2] || {}

  return (
    <TrendsTable
      selectable={selectable}
      className={styles.table}
      trendWords={topWords}
      isLoggedIn={isLoggedIn}
      selectTrend={selectTrend}
      selectedTrends={oldSelected}
      connectedTrends={connectedTrends}
      trendConnections={trendConnections}
      connectTrends={connectTrends}
      clearConnectedTrends={clearConnectedTrends}
      allTrends={allTrends}
    />
  )
}

export default TrendsTablesMobile
