import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UNISWAP_METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "uniswap_total_claims_amount") {
      metadata {
        isRestricted
      }
    }
  }
`

export function useRestrictedInfo (metric) {
  const { data } = useQuery(metric)
  return data ? data.getMetric.metadata.isRestricted : false
}
