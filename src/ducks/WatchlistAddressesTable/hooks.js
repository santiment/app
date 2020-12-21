import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ARRAY = []

const ADDRESS_HISTORICAL_BALANCE_QUERY = gql`
  query historicalBalance($address: String!) {
    historicalBalance(
      address: $address
      from: "utc_now-7d"
      to: "utc_now"
      interval: "4h"
      selector: { slug: "ethereum" }
    ) {
      balance
    }
  }
`

export function useAddressHistoricalBalance (address) {
  const { data } = useQuery(ADDRESS_HISTORICAL_BALANCE_QUERY, {
    variables: { address }
  })

  return data ? data.historicalBalance : ARRAY
}
