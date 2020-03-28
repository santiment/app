import gql from 'graphql-tag'

export const HISTOGRAM_DATA_QUERY = gql`
  query getMetric($slug: String!, $from: DateTime!, $to: DateTime!) {
    getMetric(metric: "price_histogram") {
      histogramData(slug: $slug, from: $from, to: $to, limit: 10) {
        values {
          ... on FloatRangeFloatValueList {
            data {
              range
              value
            }
          }
        }
      }
    }
  }
`

export const PROJECT_PRICE_QUERY = gql`
  query($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      priceUsd
    }
  }
`

export const HISTOGRAM_USER_PERIOD_RESTRICTIONS_QUERY = gql`
  query getMetric {
    getMetric(metric: "price_histogram") {
      metadata {
        restrictedFrom
        restrictedTo
      }
    }
  }
`
