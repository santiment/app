import React from 'react'
import gql from 'graphql-tag'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { Icon, SearchWithSuggestions } from '@santiment-network/ui'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import { hasAssetById } from '../WatchlistPopup/WatchlistsPopup'
import ProjectIcon from './../ProjectIcon'
import styles from './SearchContainer.module.scss'
import ALL_PROJECTS from './../../allProjects.json'

const TRENDING_WORDS_QUERY = gql`
  query getTrendingWords($from: DateTime!, $to: DateTime!) {
    getTrendingWords(size: 10, from: $from, to: $to, interval: "8h") {
      datetime
      topWords {
        score
        word
      }
    }
  }
`

const assetsPredicate = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return ({ ticker, name, slug }) =>
    name.toUpperCase().includes(upperCaseSearchTerm) ||
    ticker.toUpperCase().includes(upperCaseSearchTerm) ||
    slug.toUpperCase().includes(upperCaseSearchTerm)
}

const trendWordsPredicate = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()
  return word => word.toUpperCase().includes(upperCaseSearchTerm)
}

const SearchProjects = ({
  projects,
  isEditingWatchlist,
  isCopyingAssets,
  checkedAssets,
  watchlistItems,
  searchIconPosition,
  trendWords,
  ...props
}) => {
  return (
    <SearchWithSuggestions
      {...props}
      iconPosition={searchIconPosition}
      withMoreSuggestions={false}
      data={[
        {
          predicate: assetsPredicate,
          title: 'Assets',
          items: projects,
          suggestionContent: ({ name, ticker, id }) => {
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
                    <ProjectIcon
                      className={styles.icon}
                      size={16}
                      name={name}
                    />
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
          }
        },
        {
          predicate: trendWordsPredicate,
          title: 'Trending words',
          items: trendWords,
          suggestionContent: word => word
        }
      ]}
    />
  )
}

const enhance = compose(
  graphql(TRENDING_WORDS_QUERY, {
    options: () => {
      const from = new Date()
      const to = new Date()
      to.setHours(to.getHours(), 0, 0, 0)
      from.setHours(from.getHours() - 8, 0, 0, 0)

      return {
        variables: {
          from,
          to
        }
      }
    },
    props: ({ data: { getTrendingWords = [] } }) => {
      const trendWords = getTrendingWords[0]
      return {
        trendWords: trendWords
          ? trendWords.topWords.map(({ word }) => word)
          : []
      }
    }
  }),
  graphql(allProjectsForSearchGQL, {
    skip: ({ projectsList }) => projectsList && projectsList.length > 0,
    options: () => ({
      context: { isRetriable: true },
      variables: { minVolume: 0 }
    }),
    props: ({ data: { allProjects = [] } }) => {
      const projects = allProjects.length > 0 ? allProjects : ALL_PROJECTS
      return {
        projects: projects.slice().sort(({ rank: a }, { rank: b }) => a - b)
      }
    }
  })
)

export default enhance(SearchProjects)
