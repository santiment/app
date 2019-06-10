import React from 'react'
import { graphql } from 'react-apollo'
import { Icon, SearchWithSuggestions } from '@santiment-network/ui'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import { hasAssetById } from '../WatchlistPopup/WatchlistsPopup'
import ProjectIcon from './../ProjectIcon'
import styles from './SearchContainer.module.scss'
import ALL_PROJECTS from './../../allProjects.json'

const SearchProjects = ({
  data: { allProjects = [] },
  isEditingWatchlist,
  watchlistItems,
  ...props
}) => {
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
      suggestionContent={({ name, ticker, id }) => {
        const isAssetInList = isEditingWatchlist
          ? hasAssetById({ listItems: watchlistItems, id })
          : false
        return (
          <div className={styles.projectWrapper}>
            <div>
              <ProjectIcon
                className={styles.icon}
                size={16}
                ticker={ticker}
                name={name}
              />{' '}
              {name} ({ticker})
            </div>
            {isEditingWatchlist && (
              <Icon
                fill={`var(--${isAssetInList ? 'casper' : 'jungle-green'}`}
                type={isAssetInList ? 'remove' : 'plus-round'}
              />
            )}
          </div>
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
