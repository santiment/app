import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const PRICE_GRAPH_QUERY = gql`
  query getMetric(
    $selector: MetricTargetSelectorInputObject
    $from: DateTime
    $interval: interval
  ) {
    getMetric(metric: "price_usd") {
      timeseriesDataPerSlug(
        selector: $selector
        from: $from
        to: "utc_now"
        interval: $interval
      ) {
        datetime
        data {
          slug
          value
        }
      }
    }
  }
`

const PRICE_RANGES = {
  '1d': '40m',
  '7d': '5h'
}

export function usePriceGraph ({ slugs, range = '7d' }) {
  const { data = {}, loading } = useQuery(PRICE_GRAPH_QUERY, {
    skip: slugs.length === 0,
    variables: {
      selector: { slugs },
      from: `utc_now-${range}`,
      interval: PRICE_RANGES[range]
    }
  })

  if (
    data.getMetric &&
    data.getMetric.timeseriesDataPerSlug &&
    data.getMetric.timeseriesDataPerSlug.length > 0
  ) {
    return [data.getMetric.timeseriesDataPerSlug || [], loading]
  }

  return [[], loading]
}
