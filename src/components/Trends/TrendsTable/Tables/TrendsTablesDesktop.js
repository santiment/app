import React from 'react'
import TrendsTable from '../TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../../utils/dates'
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
  return (
    <div className={styles.tables}>
      {length > 1 &&
        trends.slice(0, -1).map(({ datetime, topWords }) => {
          return (
            <TrendsTable
              key={datetime}
              header={dateDifferenceInWords({
                from: new Date(datetime),
                format: HOUR
              })}
              small
              className={styles.table}
              trendWords={topWords}
              isLoggedIn={isLoggedIn}
              selectTrend={selectTrend}
              selectedTrends={selected}
              connectedTrends={connectedTrends}
              trendConnections={trendConnections}
              connectTrends={connectTrends}
              clearConnectedTrends={clearConnectedTrends}
            />
          )
        })}
      <TrendsTable
        className={styles.table}
        isLoading={isLoading}
        trendWords={length > 0 ? trends[length - 1].topWords : undefined}
        header='Last trends'
        selectable={selectable}
        isLoggedIn={isLoggedIn || true}
        selectTrend={selectTrend}
        selectedTrends={selected}
        connectedTrends={connectedTrends}
        trendConnections={trendConnections}
        connectTrends={connectTrends}
        clearConnectedTrends={clearConnectedTrends}
        allTrends={allTrends}
        hasActions
      />
    </div>
  )
}

export default TrendsTablesDesktop
