import gql from 'graphql-tag'

export const METRIC_HIGH_LOW_QUERY = gql`
  query($metric: String!, $slug: String!, $from: DateTime!, $to: DateTime!) {
    getMetric(metric: $metric) {
      min: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: MIN
      )
      max: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: MAX
      )
      last: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: LAST
      )
    }
  }
`
