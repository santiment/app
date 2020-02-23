import gql from 'graphql-tag'

export const MARKET_SEGMENT_QUERY = name => gql`
  query devActivity(
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
    $transform: String
    $movingAverageIntervalBase: Int
    $selector: GithubOrganizationsSelector
  ) {
    devActivity(
      from: $from
      to: $to
      interval: $interval
      transform: $transform
      movingAverageIntervalBase: $movingAverageIntervalBase
      selector: $selector
    ) {
      datetime
      ${name}: activity
    }
  }
`
