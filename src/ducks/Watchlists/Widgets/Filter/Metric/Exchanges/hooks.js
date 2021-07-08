import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ARRAY = []

const EXCHANGES_QUERY = gql`
  query getMarketExchanges {
    getMarketExchanges {
      exchange
      assetsCount
      pairsCount
    }
  }
`

export function useMarketExchanges () {
  const { data, loading } = useQuery(EXCHANGES_QUERY)

  return useMemo(() => [data ? data.getMarketExchanges : ARRAY, loading], [
    data
  ])
}
