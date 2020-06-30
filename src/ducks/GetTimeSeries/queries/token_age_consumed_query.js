import gql from 'graphql-tag'

export const TOKEN_AGE_CONSUMED_QUERY = gql`
  query tokenAgeConsumed(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    tokenAgeConsumed(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      tokenAgeConsumed
    }
  }
`
