import gql from 'graphql-tag'

export const GET_METRIC = metric => gql`
  query getMetric(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: String
    $transform: TimeseriesMetricTransformInputObject
  ) {
    getMetric(metric: "${metric}") {
      timeseriesData(slug: $slug, from: $from, to: $to, interval: $interval, transform: $transform) {
        datetime
        ${metric}: value
      }
    }
  }
`
