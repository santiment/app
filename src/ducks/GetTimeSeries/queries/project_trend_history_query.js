import gql from 'graphql-tag'

export const PROJECT_TREND_HISTORY_QUERY = gql`
  query getProjectTrendingHistory(
    $from: DateTime!
    $to: DateTime!
    $interval: interval
    $slug: String!
  ) {
    getProjectTrendingHistory(
      size: 10
      from: $from
      to: $to
      slug: $slug
      interval: $interval
    ) {
      datetime
      position
    }
  }
`
