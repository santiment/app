import gql from 'graphql-tag'

export const generalData = gql`
  fragment generalData on Project {
    id
    name
    slug
    description
    ticker
    rank
    logoUrl
    darkLogoUrl
    marketSegments
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

export const PROJECT_WITH_SLUG_QUERY = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...generalData
    }
  }
  ${generalData}
`

export const PROJECT_BY_ID_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      ...generalData
    }
  }
  ${generalData}
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

export const ALL_PROJECTS_PRICE_CHANGES_QUERY = gql`
  {
    allProjects {
      slug
      ticker
      percentChange1h
      percentChange24h
      percentChange7d
      marketcapUsd
    }
  }
`

export default allProjectsGQL
