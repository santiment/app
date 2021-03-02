import gql from 'graphql-tag'

export const generalData = gql`
  fragment generalData on Project {
    id
    name
    description
    slug
    ticker
    rank
    logoUrl
    darkLogoUrl
  }
`

export const project = gql`
  fragment project on Project {
    rank
    marketSegments
    priceUsd
    percentChange24h
    percentChange7d
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

export const ALL_PROJECTS_SOCIAL_VOLUME_CHANGES_QUERY = gql`
  query allProjectsByFunction($fn: json) {
    allProjectsByFunction(function: $fn) {
      projects {
        slug
        ticker
        name
        slug
        marketcapUsd
        priceUsd
        social_volume_total_change_1d: aggregatedTimeseriesData(
          metric: "social_volume_total_change_1d"
          from: "utc_now-1d"
          to: "utc_now"
          aggregation: LAST
        )
        social_volume_total_change_7d: aggregatedTimeseriesData(
          metric: "social_volume_total_change_7d"
          from: "utc_now-7d"
          to: "utc_now"
          aggregation: LAST
        )
        social_volume_total_change_30d: aggregatedTimeseriesData(
          metric: "social_volume_total_change_30d"
          from: "utc_now-30d"
          to: "utc_now"
          aggregation: LAST
        )
      }
    }
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

export const ERC20_PROJECTS_QUERY = gql`
  query allErc20Projects($minVolume: Int!, $page: Int, $pageSize: Int) {
    projects: allErc20Projects(
      minVolume: $minVolume
      page: $page
      pageSize: $pageSize
    ) {
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
