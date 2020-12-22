import React from 'react'
import TrendsTable from '../../../Tables/Trends/TrendsTable'
import styles from './TrendsTables.module.scss'

const TrendsTablesMobile = ({
  trends,
  isLoggedIn,
  trendConnections,
  oldSelected,
  selectable
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
      selectedTrends={oldSelected}
      trendConnections={trendConnections}
    />
  )
}

export default TrendsTablesMobile
