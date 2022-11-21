import React, { useState } from 'react'
import TrendsTable from '../../../../../ducks/TrendsTable'
import TopBar from './TopBar/TopBar'
import { useSocialDominanceTrendingWords } from '../hooks'
import styles from './TopTrends.module.scss'

const TopTrends = () => {
  const [period, setTrendPeriod] = useState()
  const { dominance } = useSocialDominanceTrendingWords(period)

  return (
    <div className={styles.wrapper}>
      <TopBar setTrendPeriod={setTrendPeriod} dominance={dominance} />
      <TrendsTable period={period} dominance={dominance} />
    </div>
  )
}

export default TopTrends
