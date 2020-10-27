import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useMemo } from 'react'

export const GET_AGGREGATED_METRIC = gql`
  query(
    $metric: String!
    $from: DateTime!
    $to: DateTime!
    $selector: MetricTargetSelectorInputObject
    $slug: String
    $aggregation: Aggregation = SUM
  ) {
    getMetric(metric: $metric) {
      aggregatedTimeseriesData(
        from: $from
        to: $to
        selector: $selector
        slug: $slug
        aggregation: $aggregation
      )
    }
  }
`

export const useAggregatedMetric = (settings, metric) => {
  const { data = {}, loading } = useQuery(GET_AGGREGATED_METRIC, {
    variables: { ...settings, metric }
  })

  return useMemo(
    () => {
      return {
        data: data.getMetric ? data.getMetric.aggregatedTimeseriesData : 0,
        loading
      }
    },
    [data, loading]
  )
}
