import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const UNISWAP_VALUE_DISTRIBUTION_QUERY = gql`
  query uniswapValueDistribution {
    uniswapValueDistribution {
      totalMinted
      centralizedExchanges
      decentralizedExchanges
      otherTransfers
      dexTrader
    }
  }
`
export function useUniswapValueDistribution () {
  const { data: { uniswapValueDistribution = {} } = {}, loading } = useQuery(
    UNISWAP_VALUE_DISTRIBUTION_QUERY
  )

  return [uniswapValueDistribution, loading]
}
