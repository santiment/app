import gql from 'graphql-tag'

export const BURN_RATE_QUERY = gql`
  query burnRate(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    burnRate(slug: $slug, from: $from, to: $to, interval: $interval) {
      burnRate
      datetime
    }
  }
`
