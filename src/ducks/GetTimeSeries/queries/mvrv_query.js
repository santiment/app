import gql from 'graphql-tag'

export const MVRV_QUERY = gql`
  query mvrvRatio(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: String!
  ) {
    mvrvRatio(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      mvrv: ratio
    }
  }
`
