import gql from 'graphql-tag'

export const TOKEN_VELOCITY_QUERY = gql`
  query tokenVelocity(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: String!
  ) {
    tokenVelocity(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      tokenVelocity
    }
  }
`
