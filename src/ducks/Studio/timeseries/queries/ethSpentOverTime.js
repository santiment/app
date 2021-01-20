import gql from 'graphql-tag'

export const EthSpentOverTime = gql`
  query ethSpentOverTime(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    ethSpentOverTime: projectBySlug(slug: $slug) {
      id
      ethSpentOverTime(from: $from, to: $to, interval: $interval) {
        datetime
        ethSpent
      }
    }
  }
`
