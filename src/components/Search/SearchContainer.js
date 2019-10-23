import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import SearchProjects from './SearchProjects'
import { TABS } from '../../pages/SearchMobilePage/SearchMobilePage'
import TrendsForm from '../Trends/TrendsForm'
import styles from './SearchContainer.module.scss'

export const SearchContainer = ({
  history,
  className,
  selectedTab = TABS[0].index,
  inputProps,
  ...props
}) => {
  return selectedTab === TABS[0].index ? (
    <SearchProjects
      {...props}
      inputProps={inputProps}
      className={cx(styles.wrapper, className)}
      iconPosition='left'
      onSuggestionSelect={({ slug }) => history.push(`/projects/${slug}`)}
      sorter={({ marketcapUsd: a }, { marketcapUsd: b }) => b - a}
    />
  ) : (
    <TrendsForm
      {...props}
      {...inputProps}
      classes={{ wrapper: className, input: styles.search }}
    />
  )
}

export default withRouter(SearchContainer)
