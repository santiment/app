import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const METRIC_EXCHANGES_QUERY = gql`
  query($slug: String!, $isDex: Boolean) {
    allExchanges(slug: $slug, isDex: $isDex)
  }
`

export const DEFAULT_EXCHANGE = 'All (CEX+DEX)'
const DEFAULT_EXCHANGES = [DEFAULT_EXCHANGE]

export function useMetricExchanges (slug, isDex) {
  const { data, loading } = useQuery(METRIC_EXCHANGES_QUERY, {
    variables: { slug, isDex }
  })

  return {
    exchanges: data
      ? DEFAULT_EXCHANGES.concat(data.allExchanges)
      : DEFAULT_EXCHANGES,
    loading
  }
}
