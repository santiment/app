import React from 'react'
import { graphql } from 'react-apollo'
import { Icon, SearchWithSuggestions } from '@santiment-network/ui'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import { hasAssetById } from '../WatchlistPopup/WatchlistsPopup'
import ProjectIcon from './../ProjectIcon'
import styles from './SearchContainer.module.scss'
import ALL_PROJECTS from './../../allProjects.json'

const SearchProjects = ({
  projectsList,
  isEditingWatchlist,
  isCopyingAssets,
  checkedAssets,
  watchlistItems,
  searchIconPosition,
  ...props
}) => {
  const projects = projectsList.length > 0 ? projectsList : ALL_PROJECTS
  return (
    <SearchWithSuggestions
      sorter={({ name: { length: a } }, { name: { length: b } }) => a - b}
      {...props}
      iconPosition={searchIconPosition}
      data={projects}
      predicate={searchTerm => {
        const upperCaseSearchTerm = searchTerm.toUpperCase()
        return ({ ticker, name, slug }) =>
          name.toUpperCase().includes(upperCaseSearchTerm) ||
          ticker.toUpperCase().includes(upperCaseSearchTerm) ||
          slug.toUpperCase().includes(upperCaseSearchTerm)
      }}
      suggestionContent={({ name, ticker, id }) => {
        const isAssetInList = isEditingWatchlist
          ? hasAssetById({ listItems: watchlistItems, id })
          : false
        return (
          <div className={styles.projectWrapper}>
            <div className={styles.projectInfo}>
              {isCopyingAssets ? (
                <Checkbox
                  isActive={checkedAssets.has(id)}
                  className={styles.checkbox}
                />
              ) : (
                <ProjectIcon className={styles.icon} size={16} name={name} />
              )}
              <span className={styles.name}>{name}</span>
              <span className={styles.ticker}>({ticker})</span>
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
  skip: ({ projectsList }) => projectsList && projectsList.length > 0,
  options: () => ({
    context: { isRetriable: true },
    variables: { minVolume: 0 }
  }),
  props: ({ data: { allProjects = [] } }) => ({ projectsList: allProjects })
})(SearchProjects)
