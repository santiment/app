import React, { Fragment } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { SearchWithSuggestions, Button } from '@santiment-network/ui'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import ProjectIcon from '../ProjectIcon'
import styles from './SearchContainer.module.scss'

export const NavbarAssetsSearch = ({ history, data: { allProjects = [] } }) => {
  console.log(allProjects)
  return (
    <SearchWithSuggestions
      className={styles.wrapper}
      iconPosition='left'
      onSuggestionSelect={({ coinmarketcapId }) =>
        history.push(`/projects/${coinmarketcapId}`)
      }
      data={allProjects}
      predicate={searchTerm => {
        const upperCaseSearchTerm = searchTerm.toUpperCase()
        return ({ ticker, name }) =>
          name.toUpperCase().includes(upperCaseSearchTerm) ||
          ticker.toUpperCase().includes(upperCaseSearchTerm)
      }}
      suggestionContent={({ name, ticker }) => {
        return (
          <Fragment>
            <ProjectIcon
              className={styles.icon}
              size={16}
              ticker={ticker}
              name={name}
            />{' '}
            {name} ({ticker})
          </Fragment>
        )
      }}
    />
  )
}

const enhance = compose(
  graphql(allProjectsForSearchGQL),
  withRouter
)

export default enhance(NavbarAssetsSearch)
