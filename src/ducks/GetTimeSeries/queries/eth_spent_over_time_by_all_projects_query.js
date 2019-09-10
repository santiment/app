import gql from 'graphql-tag'

export const ETH_SPENT_OVER_TIME_BY_ALL_PROJECTS_QUERY = gql`
  query ethSpentOverTimeByAllProjects(
    $interval: String
    $from: DateTime
    $to: DateTime
  ) {
    ethSpentOverTimeByAllProjects(from: $from, to: $to, interval: $interval) {
      datetime
      ethSpent
    }
  }
`
