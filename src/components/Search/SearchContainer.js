import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import SearchProjects from './SearchProjects'
import styles from './SearchContainer.module.scss'

import allProjects from './../../allProjects.json'

export const SearchContainer = ({ history, className }) => (
  <SearchProjects
    className={cx(styles.wrapper, className)}
    data={{ allProjects }}
    iconPosition='left'
    onSuggestionSelect={({ coinmarketcapId }) =>
      history.push(`/projects/${coinmarketcapId}`)
    }
  />
)

export default withRouter(SearchContainer)
