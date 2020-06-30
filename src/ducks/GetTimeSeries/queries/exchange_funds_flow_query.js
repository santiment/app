import gql from 'graphql-tag'

export const EXCHANGE_FUNDS_FLOW_QUERY = gql`
  query exchangeFundsFlow(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    exchangeFundsFlow(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      exchangeFundsFlow: inOutDifference
    }
  }
`
