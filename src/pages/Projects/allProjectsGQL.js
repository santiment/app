import gql from 'graphql-tag'

export const generalData = gql`
  fragment generalData on Project {
    id
    name
    slug
    description
    ticker
    rank
  }
`

const ethereumData = gql`
  fragment ethereumData on Project {
    fundsRaisedUsdIcoEndPrice
    ethAddresses {
      address
    }
  }
`

export const project = gql`
  fragment project on Project {
    rank
    marketSegment
    priceUsd
    percentChange24h
    volumeUsd
    volumeChange24h
    ethSpent
    averageDevActivity
    averageDailyActiveAddresses
    marketcapUsd
  }
`

export const PROJECT_RECENT_DATA_FRAGMENT = gql`
  fragment recentProjectData on Project {
    priceUsd
    percentChange7d
  }
`

export const allProjectsGQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const allProjects50GQL = gql`
  query allProjects($minVolume: Int!) {
    allProjects(page: 1, pageSize: 50, minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const projectBySlugGQL = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const RECENT_ASSET_QUERY = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...generalData
      ...recentProjectData
    }
  }
  ${generalData}
  ${PROJECT_RECENT_DATA_FRAGMENT}
`

export const ALL_PROJECTS_FOR_SEARCH_QUERY = gql`
  query allProjects($minVolume: Int!) {
    allProjects(minVolume: $minVolume) {
      ...generalData
      marketcapUsd
      rank
      infrastructure
    }
  }
  ${generalData}
`

export const ERC20_PROJECTS_QUERY = gql`
  query allErc20Projects($minVolume: Int!, $page: Int, $pageSize: Int) {
    allErc20Projects(minVolume: $minVolume, page: $page, pageSize: $pageSize) {
      ethBalance
      ...generalData
      ...project
      ...ethereumData
    }
  }
  ${ethereumData}
  ${generalData}
  ${project}
`

export const currenciesGQL = gql`
  query allCurrencyProjects($minVolume: Int!) {
    allCurrencyProjects(minVolume: $minVolume) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const allMarketSegmentsGQL = gql`
  {
    allMarketSegments {
      name
      count
    }
  }
`

export const erc20MarketSegmentsGQL = gql`
  {
    erc20MarketSegments {
      name
      count
    }
  }
`

export const currenciesMarketSegmentsGQL = gql`
  {
    currenciesMarketSegments {
      name
      count
    }
  }
`

export const ALL_ERC20_PROJECTS_QUERY = gql`
  {
    allErc20Projects {
      id
      name
      ticker
      slug
      mainContractAddress
      infrastructure
    }
  }
`

export default allProjectsGQL
