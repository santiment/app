import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "uniswap_total_claims_amount") {
      metadata {
        isRestricted
      }
    }
  }
`

export function useRestrictedInfo () {
  const { data } = useQuery(METRIC_BOUNDARIES_QUERY)
  return data ? data.getMetric.metadata.isRestricted : false
}
