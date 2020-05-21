import gql from 'graphql-tag'

export const NETWORK_GROWTH_QUERY = gql`
  query networkGrowth(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    networkGrowth(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      networkGrowth: newAddresses
    }
  }
`
