import gql from 'graphql-tag'

export const GET_SOURCE_METRIC = ({ key, queryKey = key }) => {
  return gql`
    query getMetric(
      $from: DateTime!
      $to: DateTime!
      $interval: interval
      $selector: MetricTargetSelectorInputObject
    ) {
      getMetric(metric: "${queryKey}") {
        timeseriesData(selector: $selector, from: $from, to: $to, interval: $interval) {
          datetime
          ${key}: value
        }
      }
    }
  `
}
