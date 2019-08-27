import gql from 'graphql-tag'

export const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
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
      priceUsd
      percentChange24h
      percentChange7d
      totalSupply
    }
  }
`
