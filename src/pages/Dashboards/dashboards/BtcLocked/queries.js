import gql from 'graphql-tag'

export const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "total_supply") {
      metadata {
        isRestricted
      }
    }
  }
`
