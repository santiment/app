import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import { SearchWithSuggestions } from '@santiment-network/ui'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import ProjectIcon from './../ProjectIcon'
import styles from './SearchContainer.module.scss'
import ALL_PROJECTS from './../../allProjects.json'

const SearchProjects = ({ data: { allProjects = [] }, ...props }) => {
  const projects = allProjects.length > 0 ? allProjects : ALL_PROJECTS
  return (
    <SearchWithSuggestions
      {...props}
      data={projects}
      sorter={({ name: { length: a } }, { name: { length: b } }) => a - b}
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

export default graphql(allProjectsForSearchGQL, {
  options: () => ({
    context: { isRetriable: true }
  })
})(SearchProjects)
