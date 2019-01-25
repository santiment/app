import React from 'react'
import TrendsForm from './../TrendsForm'
import HelpPopupTrends from './../../../pages/Trends/HelpPopupTrends'
import styles from './TrendsExploreSearch.module.scss'

const TrendsExploreSearch = ({ topic, className = '' }) => {
  return (
    <div className={styles.TrendsExploreSearch + ' ' + className}>
      <HelpPopupTrends className={styles.help} />
      <TrendsForm defaultTopic={topic} />
    </div>
  )
}

export default TrendsExploreSearch
