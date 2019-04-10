import React from 'react'
import cx from 'classnames'
import TrendsForm from './../TrendsForm'
import HelpPopupTrends from './../../../pages/Trends/HelpPopupTrends'
import styles from './TrendsExploreSearch.module.scss'

const TrendsExploreSearch = ({
  topic,
  classes: { wrapper: className, input: inputClassName } = {}
}) => (
  <div className={cx(styles.wrapper, inputClassName)}>
    <TrendsForm
      classes={{ wrapper: className, input: styles.search }}
      defaultTopic={topic}
    />
    <HelpPopupTrends />
  </div>
)

export default TrendsExploreSearch
