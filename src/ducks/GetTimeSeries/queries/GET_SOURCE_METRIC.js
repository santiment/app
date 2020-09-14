import gql from 'graphql-tag'

export const GET_SOURCE_METRIC = ({ key, queryKey }) => {
  return gql`
    query getMetric(
      $from: DateTime!
      $to: DateTime!
      $interval: interval
      $source: String
    ) {
      getMetric(metric: "${queryKey}") {
        timeseriesData(selector: { source: $source}, from: $from, to: $to, interval: $interval) {
          datetime
          ${key}: value
        }
      }
    }
  `
}
