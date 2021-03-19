import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { walletMetricBuilder, priceMetricBuilder } from './utils'
import {
  WALLET_ASSETS_QUERY,
  ADDRESS_QUERY,
  RECENT_TRANSACTIONS_QUERY
} from './queries'
import { getAddressInfrastructure } from '../../utils/address'
import { getValidInterval } from '../SANCharts/IntervalSelector'

const DEFAULT_STATE = []

const useWalletQuery = (query, variables, skip) =>
  useQuery(query, {
    skip: !variables.infrastructure || skip,
    variables
  })

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

export function useBlockchainAddress (wallet) {
  const { data } = useWalletQuery(ADDRESS_QUERY, wallet)
  return data ? data.blockchainAddress : DEFAULT_STATE
}
export const useAddressLabels = wallet =>
  useBlockchainAddress(wallet).labels || DEFAULT_STATE

export const useAddressNote = wallet => useBlockchainAddress(wallet).notes || ''

export function useWalletAssets (wallet) {
  const { data, loading, error } = useWalletQuery(WALLET_ASSETS_QUERY, wallet)

  return {
    walletAssets: data ? data.assetsHeldByAddress : DEFAULT_STATE,
    isLoading: loading,
    isError: error
  }
}

export function useRecentTransactions (wallet, page, skip) {
  const { data, loading } = useWalletQuery(
    RECENT_TRANSACTIONS_QUERY,
    Object.assign({ page }, wallet),
    skip
  )
  return {
    recentTransactions: data ? data.recentTransactions : DEFAULT_STATE,
    isLoading: loading
  }
}

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
