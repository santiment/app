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
  const { data } = useQuery(WALLET_ASSETS_QUERY, {
    skip: !address,
    variables: {
      address,
    },
  })

  return data ? data.assetsHeldByAddress : DEFAULT_STATE
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
