import React from 'react'
import gql from 'graphql-tag'
import Tabs from '@santiment-network/ui/Tabs'
import { projectSorter } from './utils'
import { ALL_PROJECTS_QUERY, projectSearchData } from './withProjects'
import { client } from '../../../index'

const FIAT_MARKET_ASSETS = [
  { slug: 's-and-p-500', name: 'S&P500', ticker: 'SPX' },
  { slug: 'gold', name: 'Gold', ticker: 'Gold' },
]

const Category = {
  All: 'All',
  ERC20: 'ERC20',
  Stablecoins: 'Stablecoins',
  Centralized: 'Centralized',
  Decentralized: 'Decentralized',
  Fiat: 'Fiat',
}

const OPTIONS = Object.keys(Category)

const GET_WATCHLIST_QUERY = (slug) => gql`
  query watchlistBySlug {
    watchlist: watchlistBySlug(slug: "${slug}") {
      id
      listItems {
        project {
          ...projectSearchData
        }
      }
    }
  }
  ${projectSearchData}
`

const ERC20_PROJECTS_QUERY = gql`
  query allErc20Projects($minVolume: Int = 0) {
    allErc20Projects(minVolume: $minVolume) {
      ...projectSearchData
    }
  }
  ${projectSearchData}
`

const CategoryQuery = {
  [Category.All]: ALL_PROJECTS_QUERY,
  [Category.ERC20]: ERC20_PROJECTS_QUERY,
  [Category.Stablecoins]: GET_WATCHLIST_QUERY('stablecoins'),
  [Category.Centralized]: GET_WATCHLIST_QUERY('centralized_exchanges'),
  [Category.Decentralized]: GET_WATCHLIST_QUERY('decentralized_exchanges'),
}

const watchlistProjectsExtracter = ({ data: { watchlist } }) =>
  watchlist.listItems.map(({ project }) => project)

const CategoryDataExtracter = {
  [Category.All]: ({ data: { allProjects } }) =>
    allProjects.concat(FIAT_MARKET_ASSETS),
  [Category.ERC20]: ({ data: { allErc20Projects } }) => allErc20Projects,
  [Category.Stablecoins]: watchlistProjectsExtracter,
  [Category.Centralized]: watchlistProjectsExtracter,
  [Category.Decentralized]: watchlistProjectsExtracter,
}

const normalizeData = (data) => data.slice().sort(projectSorter)

function getProjectsByCategory(category) {
  switch (category) {
    case Category.Fiat:
      return Promise.resolve(FIAT_MARKET_ASSETS)

    default:
      return client
        .query({ query: CategoryQuery[category] })
        .then(CategoryDataExtracter[category])
        .then(normalizeData)
  }
}

const ProjectsSelectTabs = ({ onSelect, className }) => {
  function onTabSelect(category) {
    getProjectsByCategory(category).then(onSelect)
    onSelect(null, true) // projects, isLoading
  }

  return (
    <Tabs
      options={OPTIONS}
      defaultSelectedIndex='All'
      onSelect={onTabSelect}
      className={className}
    />
  )
}

export default ProjectsSelectTabs
