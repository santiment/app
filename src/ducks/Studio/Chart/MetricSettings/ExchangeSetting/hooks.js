import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const METRIC_EXCHANGES_QUERY = gql`
  query($slug: String!) {
    allExchanges(slug: $slug)
  }
`

export const DEFAULT_EXCHANGE = 'All'
const DEFAULT_EXCHANGES = [DEFAULT_EXCHANGE]

export function useMetricExchanges (slug) {
  const { data } = useQuery(METRIC_EXCHANGES_QUERY, {
    variables: { slug }
  })

  return data ? DEFAULT_EXCHANGES.concat(data.allExchanges) : DEFAULT_EXCHANGES
}
