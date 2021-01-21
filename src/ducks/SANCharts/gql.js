import gql from 'graphql-tag'

export const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
      availableQueries
      marketSegments
    }
  }
`

export const PROJECT_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      ticker
      name
      description
      logoUrl
      darkLogoUrl
      priceUsd
      percentChange24h
      percentChange7d
      totalSupply
    }
  }
`

export const PROJECT_BY_SLUG_MOBILE_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      ticker
      name
      priceUsd
      percentChange24h
      percentChange7d
      devActivity30: averageDevActivity
      devActivity60: averageDevActivity(days: 60)
      icoPrice
    }
  }
`
