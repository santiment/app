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
