import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import {
  WALLET_ASSETS_QUERY,
  ADDRESS_QUERY,
  RECENT_TRANSACTIONS_QUERY,
  TRANSACTION_PROJECT_QUERY
} from './queries'
import { getAddressInfrastructure } from '../../utils/address'

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

export function useTransactionProject (slug) {
  const { data } = useQuery(TRANSACTION_PROJECT_QUERY, {
    variables: { slug }
  })

  return data ? data.projectBySlug : DEFAULT_STATE
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
