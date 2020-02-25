import React, { useState } from 'react'
import cx from 'classnames'
import TrendsTable from '../TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../../utils/dates'
import styles from './TrendsTables.module.scss'
import PageLoader from '../../../Loader/PageLoader'

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
    return <PageLoader />
  }

  const [index, setIndex] = useState(0)

  const { datetime, topWords } = trends[index]

  console.log(trendConnections)

  return (
    <>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {TABS.map(({ title, showIndex, description }) => {
            return (
              <div className={styles.tab} key={showIndex}>
                <div
                  className={cx(index === showIndex && styles.active)}
                  onClick={() => setIndex(showIndex)}
                >
                  {title}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.container}>
        <TrendsTable
          header={dateDifferenceInWords({
            from: new Date(datetime),
            format: HOUR
          })}
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
