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
  selectedTab = TABS[0].index
}) => {
  return selectedTab === TABS[0].index ? (
    <SearchProjects
      className={cx(styles.wrapper, className)}
      iconPosition='left'
      onSuggestionSelect={({ coinmarketcapId }) =>
        history.push(`/projects/${coinmarketcapId}`)
      }
    />
  ) : (
    <TrendsForm classes={{ wrapper: className, input: styles.search }} />
  )
}

export default withRouter(SearchContainer)
