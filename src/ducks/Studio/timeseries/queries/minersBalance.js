import gql from 'graphql-tag'

export const MINERS_BALANCE_QUERY = gql`
  query minersBalance(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval
  ) {
    minersBalance(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      minersBalance: balance
    }
  }
`
