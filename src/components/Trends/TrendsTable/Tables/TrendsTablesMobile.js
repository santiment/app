import React, { useState } from 'react'
import cx from 'classnames'
import TrendsTable from '../TrendsTable'
import styles from './TrendsTables.module.scss'

const TABS = [
  {
    title: 'Latest trends',
    showIndex: 2,
    description: 'Trending words'
  },
  {
    title: '2 h ago',
    showIndex: 1,
    description: 'Trending score'
  },
  {
    title: '3 h ago',
    showIndex: 0,
    description: 'Social volume'
  }
]

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

  const [index, setIndex] = useState(0)

  const { topWords } = trends[index]

  return (
    <>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {TABS.map(({ title, showIndex, description }) => {
            return (
              <div
                key={showIndex}
                className={cx(styles.tab, index === showIndex && styles.active)}
                onClick={() => setIndex(showIndex)}
              >
                {title}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.container}>
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
      </div>
    </>
  )
}

export default TrendsTablesMobile
