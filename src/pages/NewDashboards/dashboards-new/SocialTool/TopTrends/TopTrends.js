import React, { useState } from 'react'
import TopTrendsTable from './Table/TopTrendsTable'
import TopBar from './TopBar/TopBar'
import styles from './TopTrends.module.scss'

const TopTrends = () => {
  const [period, setTrendPeriod] = useState()

  return (
    <div className={styles.wrapper}>
      <TopBar setTrendPeriod={setTrendPeriod} />
      <TopTrendsTable period={period} />
    </div>
  )
}

export default TopTrends
