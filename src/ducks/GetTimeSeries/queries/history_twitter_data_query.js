import gql from 'graphql-tag'

export const HISTORY_TWITTER_DATA_QUERY = gql`
  query historyTwitterData(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    historyTwitterData(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      followersCount
    }
  }
`
