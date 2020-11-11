import { useQuery } from '@apollo/react-hooks'
import { PRICE_GRAPH_QUERY } from '../../../gql'

export function usePriceGraph ({ items }) {
  const slugs = items.map(item => item.slug)
  const { data = {}, loading } = useQuery(PRICE_GRAPH_QUERY, {
    skip: slugs.length === 0,
    variables: { selector: { slugs } }
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
