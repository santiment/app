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
      cexTrader
      cexDexTrader
    }
  }
`

const UNISWAP_WHO_CLAIMED_QUERY = gql`
  query uniswapWhoClaimed {
    uniswapWhoClaimed {
      centralizedExchanges
      decentralizedExchanges
      otherAddresses
    }
  }
`

export function useUniswapValueDistribution () {
  const { data: { uniswapValueDistribution } = {}, loading } = useQuery(
    UNISWAP_VALUE_DISTRIBUTION_QUERY
  )

  return [uniswapValueDistribution, loading]
}

export function useUniswapWhoMoved () {
  const { data: { uniswapWhoClaimed } = {}, loading } = useQuery(
    UNISWAP_WHO_CLAIMED_QUERY
  )

  return [uniswapWhoClaimed, loading]
}
