import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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
      walletAssets.map(({ slug }) => ({
        key: slug,
        queryKey: 'historicalBalance',
        reqMeta: {
          slug,
          infrastructure: 'ETH',
        },
      })),
    [walletAssets],
  )
}
