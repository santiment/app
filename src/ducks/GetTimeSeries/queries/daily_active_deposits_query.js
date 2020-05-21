import gql from 'graphql-tag'

export const DAILY_ACTIVE_DEPOSITS_QUERY = gql`
  query dailyActiveDeposits(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    dailyActiveDeposits(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
    ) {
      datetime
      activeDeposits
    }
  }
`
