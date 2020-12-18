import { useState, useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import { getAddressInfrastructure } from '../../utils/address'

const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!, $infrastructure: String!) {
    assetsHeldByAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      slug
      balance
    }
  }
`

const DEFAULT_STATE = []

export function getWalletMetrics (walletAssets, priceAssets) {
  const walletMetrics = walletAssets.map(walletMetricBuilder)
  const priceMetrics = priceAssets.map(priceMetricBuilder)
  return walletMetrics.concat(priceMetrics)
}

export const useWalletMetrics = (walletAssets, priceAssets) =>
  useMemo(() => getWalletMetrics(walletAssets, priceAssets), [
    walletAssets,
    priceAssets
  ])

export function useWalletAssets ({ address, infrastructure }) {
  const { data, loading, error } = useQuery(WALLET_ASSETS_QUERY, {
    skip: !(address && infrastructure),
    variables: {
      address,
      infrastructure
    }
  })

  return {
    walletAssets: data ? data.assetsHeldByAddress : DEFAULT_STATE,
    isLoading: loading,
    isError: error
  }
}

export function useInfrastructureDetector (address) {}

export function useSettings (defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings)
  const { address } = settings

  useMemo(() => (settings.infrastructure = getAddressInfrastructure(address)), [
    address
  ])

  function onAddressChange (address) {
    setSettings({
      ...settings,
      address
    })
  }

  function changeTimePeriod (from, to, timeRange) {
    setSettings(state => ({
      ...state,
      timeRange,
      interval: getValidInterval(from, to),
      from: from.toISOString(),
      to: to.toISOString()
    }))
  }

  return {
    settings,
    changeTimePeriod,
    onAddressChange
  }
}
