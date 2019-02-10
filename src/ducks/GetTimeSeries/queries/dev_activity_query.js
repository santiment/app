import gql from 'graphql-tag'

export const DEV_ACTIVITY_QUERY = gql`
  query queryDevActivity(
    $slug: String
    $from: DateTime!
    $to: DateTime!
    $interval: String!
    $transform: String
    $movingAverageIntervalBase: Int
  ) {
    devActivity(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      transform: $transform
      movingAverageIntervalBase: $movingAverageIntervalBase
    ) {
      datetime
      activity
    }
  }
`
