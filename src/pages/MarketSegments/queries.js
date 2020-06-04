import gql from 'graphql-tag'

export const PROJECTS_QUERY = gql`
  query allProjectsByFunction($fn: json) {
    assets: allProjectsByFunction(function: $fn) {
      slug
      ticker
      name
      infrastructure
      priceUsd
      logoUrl
      darkLogoUrl
      devActivity7: averageDevActivity(days: 7)
      devActivity30: averageDevActivity
    }
  }
`

export const DEV_ACTIVITY_CHANGE_QUERY = gql`
  query allProjectsDevActivity($from: DateTime!, $to: DateTime!) {
    allProjects {
      name
      slug
      dev_activity_change_30d: aggregatedTimeseriesData(
        metric: "dev_activity_change_30d"
        from: $from
        to: $to
        aggregation: LAST
        includeIncompleteData: true
      )
    }
  }
`
