import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import Tabs from '@santiment-network/ui/Tabs'
import { projectSorter } from './utils'
import { ALL_PROJECTS_QUERY, projectSearchData } from './withProjects'
import { client } from '../../../apollo'

const Category = {
  All: 'All',
  ERC20: 'ERC20',
  Stablecoins: 'Stablecoins',
  DeFi: 'DeFi'
}

export const DEFAULT_TABS = Object.keys(Category)

const GET_WATCHLIST_QUERY = slug => gql`
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

export const ERC20_PROJECTS_QUERY = gql`
  query allErc20Projects($minVolume: Int = 0) {
    projects: allErc20Projects(minVolume: $minVolume) {
      ...projectSearchData
    }
  }
  ${projectSearchData}
`

export const CategoryQuery = {
  [Category.All]: ALL_PROJECTS_QUERY,
  [Category.ERC20]: ERC20_PROJECTS_QUERY,
  [Category.Stablecoins]: GET_WATCHLIST_QUERY('stablecoins'),
  [Category.DeFi]: GET_WATCHLIST_QUERY('defi')
}

const projectsExtracter = ({ data: { projects } }) => projects

const watchlistProjectsExtracter = ({ data: { watchlist } }) =>
  watchlist ? watchlist.listItems.map(({ project }) => project) : []

export const CategoryDataExtracter = {
  [Category.All]: projectsExtracter,
  [Category.ERC20]: projectsExtracter,
  [Category.Stablecoins]: watchlistProjectsExtracter,
  [Category.DeFi]: watchlistProjectsExtracter
}

const normalizeData = data => data.slice().sort(projectSorter)

const noop = data => data

function getProjectsByCategory (category, fetchCustomCategory, modifyCategory) {
  if (fetchCustomCategory) {
    return fetchCustomCategory().then(normalizeData)
  }

  return client
    .query({ query: CategoryQuery[category] })
    .then(CategoryDataExtracter[category])
    .then(modifyCategory || noop)
    .then(normalizeData)
}

const ProjectsSelectTabs = ({
  className,
  customTabs,
  CustomCategory,
  CategoryModifier,
  onSelect,
  showTabs = true
}) => {
  function onTabSelect (category) {
    getProjectsByCategory(
      category,
      CustomCategory[category],
      CategoryModifier[category]
    ).then(onSelect)

    onSelect(null, true) // projects, isLoading
  }

  useEffect(() => {
    onTabSelect(customTabs[0])
  }, [])

  return (
    showTabs && (
      <Tabs
        options={customTabs}
        defaultSelectedIndex='All'
        onSelect={onTabSelect}
        className={className}
      />
    )
  )
}

ProjectsSelectTabs.defaultProps = {
  customTabs: DEFAULT_TABS,
  CustomCategory: {},
  CategoryModifier: {}
}

export default ProjectsSelectTabs
