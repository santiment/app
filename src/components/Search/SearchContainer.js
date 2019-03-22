import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchProjects from './SearchProjects'
import styles from './SearchContainer.module.scss'

export const SearchContainer = ({ history }) => {
  return (
    <SearchProjects
      className={styles.wrapper}
      iconPosition='left'
      onSuggestionSelect={({ coinmarketcapId }) =>
        history.push(`/projects/${coinmarketcapId}`)
      }
    />
  )
}

export default withRouter(SearchContainer)
