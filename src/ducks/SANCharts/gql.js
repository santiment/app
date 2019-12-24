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
      priceUsd
      percentChange24h
      percentChange7d
      totalSupply
    }
  }
`

export const HISTOGRAM_DATA_QUERY = gql`
  query getMetric(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: Int
  ) {
    getMetric(metric: "age_distribution") {
      histogramData(
        slug: $slug
        from: $from
        to: $to
        limit: 7
        interval: $interval
      ) {
        labels
        values {
          ... on FloatList {
            data
          }
        }
      }
    }
  }
`
