import gql from 'graphql-tag'

export const TOKEN_CIRCULATION_QUERY = gql`
  query tokenCirculation(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    tokenCirculation(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      tokenCirculation
    }
  }
`
