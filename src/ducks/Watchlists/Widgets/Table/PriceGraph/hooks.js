import { useQuery } from '@apollo/react-hooks'
import { PRICE_GRAPH_QUERY } from '../../../gql'

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
