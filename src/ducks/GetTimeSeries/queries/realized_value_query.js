import gql from 'graphql-tag'

export const REALIZED_VALUE_QUERY = gql`
  query realizedValue(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    realizedValue(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      realizedValue
    }
  }
`
