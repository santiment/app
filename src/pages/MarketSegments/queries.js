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
