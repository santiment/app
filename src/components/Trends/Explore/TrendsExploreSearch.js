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
  <TrendsForm
    classes={{
      wrapper: cx(className, styles.wrapper),
      input: cx(inputClassName, styles.input)
    }}
    defaultTopic={topic}
    history={history}
  />
)

export default TrendsExploreSearch
