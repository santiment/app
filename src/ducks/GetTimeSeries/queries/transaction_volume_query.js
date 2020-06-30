import gql from 'graphql-tag'

export const TRANSACTION_VOLUME_QUERY = gql`
  query transactionVolume(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    transactionVolume(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      transactionVolume
    }
  }
`
