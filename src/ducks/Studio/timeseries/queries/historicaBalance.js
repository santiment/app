import gql from 'graphql-tag'

export const HISTORICAL_BALANCE_QUERY = gql`
  query historicalBalance(
    $from: DateTime!
    $to: DateTime!
    $address: String!
    $interval: interval!
    $slug: String!
    $infrastructure: String!
  ) {
    historicalBalance(
      address: $address
      interval: $interval
      from: $from
      to: $to
      selector: { slug: $slug, infrastructure: $infrastructure }
    ) {
      datetime
      balance
    }
  }
`
