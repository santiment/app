import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { updateTooltipSetting } from '../dataHub/tooltipSettings'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!) {
    assetsHeldByAddress(address: $address) {
      slug
      balance
    }
  }
`

const DEFAULT_STATE = []

export function useWalletAssets(address) {
  const { data, loading, error } = useQuery(WALLET_ASSETS_QUERY, {
    skip: !address,
    variables: {
      address,
    },
  })

  const walletAssets = data ? data.assetsHeldByAddress : DEFAULT_STATE
  return {
    walletAssets,
    isLoading: loading,
    isError: error,
  }
}

export function useWalletMetrics(walletAssets) {
  return useMemo(
    () =>
      walletAssets.map(({ slug }) => {
        const metric = {
          key: slug,
          label: slug,
          node: 'line',
          queryKey: 'historicalBalance',
          reqMeta: {
            slug,
            infrastructure: 'ETH',
          },
        }
        updateTooltipSetting(metric)
        return metric
      }),
    [walletAssets],
  )
}
