import gql from 'graphql-tag'

export const METRIC_ANOMALIE_QUERY = gql`
  query metricAnomaly(
    $from: DateTime!
    $metric: AnomaliesMetricsEnum!
    $slug: String!
    $to: DateTime!
  ) {
    metricAnomaly(from: $from, to: $to, slug: $slug, metric: $metric) {
      datetime
    }
  }
`
