import React from 'react'
import cx from 'classnames'
import TrendsForm from './../TrendsForm'
import HelpPopupTrends from './../../../pages/Trends/HelpPopupTrends'
import styles from './TrendsExploreSearch.module.scss'

const TrendsExploreSearch = ({ topic, className }) => (
  <div className={cx(styles.wrapper, className)}>
    <TrendsForm classes={{ input: cx(styles.search) }} defaultTopic={topic} />
    <HelpPopupTrends />
  </div>
)

export default TrendsExploreSearch
