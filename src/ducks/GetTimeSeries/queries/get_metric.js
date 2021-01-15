import gql from 'graphql-tag'
import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'

export const GET_METRIC = metric => gql`
  query getMetric(
    $slug: String
    $from: DateTime!
    $to: DateTime!
    $interval: interval
    $transform: TimeseriesMetricTransformInputObject
    $selector: MetricTargetSelectorInputObject
    $aggregation: Aggregation
  ) {
    getMetric(metric: "${metric}") {
      timeseriesData(slug: $slug,
        from: $from,
        to: $to,
        interval: $interval,
        transform: $transform,
        selector: $selector,
        aggregation: $aggregation
      ) {
        datetime
        ${metric}: value
      }
    }
  }
`

export const useMetric = (settings, metric) => {
  const query = useMemo(() => GET_METRIC(metric), [metric])

  const { data = {}, loading } = useQuery(query, {
    variables: { ...settings, metric }
  })

  return useMemo(
    () => {
      return {
        data: data.getMetric
          ? data.getMetric.timeseriesData.reduce(
            (acc, item) => acc + item[metric],
            0
          )
          : 0,
        loading
      }
    },
    [data, loading]
  )
}

export const AGGREGATION_TYPES = {
  MAX: 'MAX',
  LAST: 'LAST',
  SUM: 'SUM',
  AVG: 'AVG'
}
