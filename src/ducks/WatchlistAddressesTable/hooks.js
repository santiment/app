import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ARRAY = []

const ADDRESS_HISTORICAL_BALANCE_QUERY = (slug) => gql`
  query historicalBalance($address: String!) {
    historicalBalance(
      address: $address
      from: "utc_now-7d"
      to: "utc_now"
      interval: "4h"
      selector: { slug: "${slug}" }
    ) {
      balance
    }
  }
`

export function useAddressHistoricalBalance (address, slug) {
  const { data } = useQuery(ADDRESS_HISTORICAL_BALANCE_QUERY(slug), {
    variables: { address },
  })

  return data ? data.historicalBalance : ARRAY
}
