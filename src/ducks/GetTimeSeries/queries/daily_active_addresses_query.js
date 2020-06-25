import gql from 'graphql-tag'

export const DAILY_ACTIVE_ADDRESSES_QUERY = gql`
  query dailyActiveAddresses(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    dailyActiveAddresses(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
    ) {
      datetime
      dailyActiveAddresses: activeAddresses
    }
  }
`
