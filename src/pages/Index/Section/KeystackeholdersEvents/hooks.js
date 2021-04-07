import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const RAW_SIGNALS_QUERY = gql`
  query getMetric($from: DateTime!, $to: DateTime!) {
    getRawSignals(from: $from, to: $to) {
      datetime
      signal
      slug
      value
      metadata
    }
  }
`

export const useRawSignals = ({ from, to }) => {
  const { data, loading } = useQuery(RAW_SIGNALS_QUERY, {
    variables: {
      from,
      to
    }
  })

  return { data: data ? data.getRawSignals : [], loading }
}
