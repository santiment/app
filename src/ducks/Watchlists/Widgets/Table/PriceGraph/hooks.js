import { useQuery } from '@apollo/react-hooks'
import { PRICE_GRAPH_QUERY } from '../../../gql'

export function usePriceGraph ({ watchlistId }) {
  const { data = {}, loading } = useQuery(PRICE_GRAPH_QUERY, {
    skip: !watchlistId,
    variables: { selector: { watchlistId } }
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
