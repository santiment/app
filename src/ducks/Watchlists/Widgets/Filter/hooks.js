import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ARRAY = []

const AVAILABLE_METRICS_QUERY = gql`
  query getAvailableMetrics {
    getAvailableMetrics
  }
`

export function useAvailableMetrics () {
  const { data, loading } = useQuery(AVAILABLE_METRICS_QUERY)
  return { availableMetrics: data ? data.getAvailableMetrics : ARRAY, loading }
}
