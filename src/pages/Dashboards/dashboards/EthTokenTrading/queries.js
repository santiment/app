import gql from 'graphql-tag'

export const LABEL_METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "all_known_balance") {
      metadata {
        isRestricted
      }
    }
  }
`
