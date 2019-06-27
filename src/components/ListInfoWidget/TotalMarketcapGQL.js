import gql from 'graphql-tag'

export const totalMarketcapGQL = gql`
  query historyPrice(
    $from: DateTime!
    $to: DateTime!
    $slug: String
    $interval: String = "1d"
  ) {
    historyPrice(from: $from, to: $to, slug: $slug, interval: $interval) {
      marketcap
      volume
      datetime
    }
  }
`

export const projectsListHistoryStatsGQL = gql`
  query projectsListHistoryStats(
    $from: DateTime!
    $to: DateTime!
    $slugs: [String]!
    $interval: String = "1d"
  ) {
    projectsListHistoryStats(
      from: $from
      to: $to
      slugs: $slugs
      interval: $interval
    ) {
      marketcap
      volume
      datetime
    }
  }
`
