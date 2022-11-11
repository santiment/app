import React, { useState } from 'react'
import TrendsTable from '../../../../../ducks/TrendsTable'
import TopBar from './TopBar/TopBar'
import styles from './TopTrends.module.scss'

const TopTrends = () => {
  const [period, setTrendPeriod] = useState()

  return (
    <div className={styles.wrapper}>
      <TopBar setTrendPeriod={setTrendPeriod} period={period} />
      <TrendsTable period={period} />
    </div>
  )
}

export default TopTrends
