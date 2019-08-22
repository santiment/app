import gql from 'graphql-tag'

export const GET_METRIC = gql`
  query getMetric(
    $metric: String!
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: String
  ) {
    metric: getMetric(metric: $metric) {
      data: timeseriesData(
        slug: $slug
        from: $from
        to: $to
        interval: $interval
      ) {
        datetime
        value
      }
    }
  }
`
