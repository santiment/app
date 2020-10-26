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
  ) {
    getMetric(metric: $metric) {
      aggregatedTimeseriesData(
        from: $from
        to: $to
        selector: $selector
        slug: $slug
        aggregation: SUM
      )
    }
  }
`

export const useAggregatedMetric = (settings, metric) => {
  const { from, to, selector } = settings

  const { data = {}, loading } = useQuery(GET_AGGREGATED_METRIC, {
    variables: { from, to, metric, selector }
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
