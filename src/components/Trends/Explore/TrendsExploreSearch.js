import React from 'react'
import cx from 'classnames'
import TrendsForm from './../TrendsForm'
import HelpPopupTrends from './../../../pages/Trends/HelpPopupTrends'
import styles from './TrendsExploreSearch.module.scss'

const TrendsExploreSearch = ({
  topic,
  history,
  classes: { wrapper: className, input: inputClassName } = {},
  isDesktop
}) => (
  <div className={cx(styles.wrapper, inputClassName)}>
    <TrendsForm
      classes={{ wrapper: className, input: styles.search }}
      defaultTopic={topic}
      history={history}
    />
    {isDesktop && <HelpPopupTrends />}
  </div>
)

export default TrendsExploreSearch
