import React from 'react'
import gql from 'graphql-tag'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import { SearchWithSuggestions } from '@santiment-network/ui/Search'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../ducks/Watchlists/gql/allProjectsGQL'
import { hasAssetById } from '../../ducks/Watchlists/utils'
import ProjectIcon from './../ProjectIcon/ProjectIcon'
import styles from './SearchContainer.module.scss'
import ALL_PROJECTS from './../../allProjects.json'

const TRENDING_WORDS_QUERY = gql`
  query getTrendingWords($from: DateTime!, $to: DateTime!) {
    getTrendingWords(size: 10, from: $from, to: $to, interval: "1h") {
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

const calculateMatchIndex = (str, value) => {
  const index = value.toUpperCase().indexOf(str)
  return index === -1 ? Infinity : index
}

const fullMatch = (str, value) => {
  return str === value.toUpperCase()
}
export const assetsSorter = searchTerm => {
  const upperCaseSearchTerm = searchTerm.toUpperCase()

  return (a, b) => {
    if (fullMatch(upperCaseSearchTerm, a.name)) {
      return -1
    } else if (fullMatch(upperCaseSearchTerm, b.name)) {
      return 1
    } else if (fullMatch(upperCaseSearchTerm, a.ticker)) {
      return -1
    } else if (fullMatch(upperCaseSearchTerm, b.ticker)) {
      return 1
    } else {
      const matchIndexNameA = calculateMatchIndex(upperCaseSearchTerm, a.name)
      const matchIndexNameB = calculateMatchIndex(upperCaseSearchTerm, b.name)

      if (matchIndexNameA === matchIndexNameB) {
        const matchIndexTickerA = calculateMatchIndex(
          upperCaseSearchTerm,
          a.ticker
        )
        const matchIndexTickerB = calculateMatchIndex(
          upperCaseSearchTerm,
          b.ticker
        )

        if (matchIndexTickerA === matchIndexTickerB) {
          return b.marketcapUsd - a.marketcapUsd
        } else {
          return matchIndexTickerA - matchIndexTickerB
        }
      } else {
        return matchIndexNameA - matchIndexNameB
      }
    }
  }
}

const AssetSuggestion = ({
  id,
  name,
  ticker,
  slug,
  logoUrl,
  darkLogoUrl,
  isCopyingAssets,
  checkedAssets,
  isEditingWatchlist,
  isAssetInList
}) => (
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
          slug={slug}
          logoUrl={logoUrl}
          darkLogoUrl={darkLogoUrl}
        />
      )}
      <span className={styles.name}>{name}</span>
      <span className={styles.ticker}>{ticker}</span>
    </div>
    {isEditingWatchlist && (
      <Icon
        fill={`var(--${isAssetInList ? 'casper' : 'jungle-green'}`}
        type={isAssetInList ? 'remove' : 'plus-round'}
      />
    )}
  </div>
)

const Header = () => {
  return (
    <div className={styles.header}>
      <div>Press enter to add one of few assets</div>
      <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="20" rx="4" fill="#9FAAC4"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17 5.5994C17 5.26836 16.717 5 16.3679 5C16.0187 5 15.7357 5.26836 15.7357 5.5994V9.22339C15.7357 9.61364 15.5722 9.9879 15.2812 10.2639C14.9902 10.5398 14.5955 10.6948 14.1839 10.6948H9.15835L11.355 8.6119C11.6019 8.37782 11.6019 7.9983 11.355 7.76421C11.1082 7.53013 10.7079 7.53013 10.4611 7.76421L7.18515 10.8705C6.93828 11.1046 6.93828 11.4841 7.18515 11.7182L10.4611 14.8244C10.7079 15.0585 11.1082 15.0585 11.355 14.8244C11.6019 14.5904 11.6019 14.2108 11.355 13.9768L9.15815 11.8936H14.1839C14.9308 11.8936 15.6471 11.6123 16.1752 11.1115C16.7033 10.6108 17 9.93158 17 9.22339V5.5994Z" fill="white"/>
      </svg>
    </div>
  )
}

const SearchProjects = ({
  trendWords = [],
  projects = [],
  isEditingWatchlist,
  isCopyingAssets,
  checkedAssets,
  watchlistItems,
  onSuggestionSelect,
  ...props
}) => {
  return (
    <SearchWithSuggestions
      {...props}
      withMoreSuggestions={false}
      header={<Header />}
      onSuggestionSelect={onSuggestionSelect}
      data={[
        {
          title: 'Assets',
          predicate: assetsPredicate,
          items: projects,
          sorter: assetsSorter,
          suggestionContent: ({
            name,
            ticker,
            slug,
            logoUrl,
            darkLogoUrl,
            id
          }) => {
            const isAssetInList = isEditingWatchlist
              ? hasAssetById({ listItems: watchlistItems, id })
              : false
            return (
              <AssetSuggestion
                isAssetInList={isAssetInList}
                id={id}
                name={name}
                ticker={ticker}
                slug={slug}
                logoUrl={logoUrl}
                darkLogoUrl={darkLogoUrl}
                isEditingWatchlist={isEditingWatchlist}
                isCopyingAssets={isCopyingAssets}
                checkedAssets={checkedAssets}
              />
            )
          }
        },
        {
          title: 'Trending words',
          predicate: trendWordsPredicate,
          items: trendWords,
          suggestionContent: word => word
        }
      ]}
    />
  )
}

const enhance = compose(
  graphql(TRENDING_WORDS_QUERY, {
    skip: ({ noTrends }) => noTrends,
    options: () => {
      const from = new Date()
      const to = new Date()
      to.setHours(to.getHours(), 0, 0, 0)
      from.setHours(from.getHours() - 1, 0, 0, 0)

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
  graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
    skip: ({ projects }) => projects && projects.length > 0,
    options: () => ({
      context: { isRetriable: true },
      variables: { minVolume: 0 }
    }),
    props: ({ data: { allProjects = [] } }) => {
      const projects = allProjects.length > 0 ? allProjects : ALL_PROJECTS

      return {
        projects: projects
          .slice()
          .sort(({ rank: a }, { rank: b }) => (a || Infinity) - (b || Infinity))
      }
    }
  })
)

export default enhance(SearchProjects)
