import React from 'react'
import TrendsForm from './../TrendsForm'
import HelpPopupTrends from './../../../pages/Trends/HelpPopupTrends'
import styles from './TrendsExploreSearch.module.scss'

const TrendsExploreSearch = ({ topic }) => (
  <div className={styles.wrapper}>
    <TrendsForm className={styles.search} defaultTopic={topic} />
    <HelpPopupTrends />
  </div>
)

export default TrendsExploreSearch
