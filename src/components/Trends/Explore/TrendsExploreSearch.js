import React from 'react'
import cx from 'classnames'
import TrendsForm from './../TrendsForm'
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
  </div>
)

export default TrendsExploreSearch
