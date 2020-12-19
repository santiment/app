import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import {
  WALLET_ASSETS_QUERY,
  ADDRESS_LABELS_QUERY,
  RECENT_TRANSACTIONS_QUERY,
  TRANSACTION_PROJECT_QUERY
} from './queries'
import { getAddressInfrastructure } from '../../utils/address'

const DEFAULT_STATE = []

const useWalletQuery = (query, variables) =>
  useQuery(query, {
    skip: !variables.infrastructure,
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

export function useAddressLabels (wallet) {
  const { data } = useWalletQuery(ADDRESS_LABELS_QUERY, wallet)
  return data ? data.blockchainAddress.labels : DEFAULT_STATE
}

export function useWalletAssets (wallet) {
  const { data, loading, error } = useWalletQuery(WALLET_ASSETS_QUERY, wallet)

  return {
    walletAssets: data ? data.assetsHeldByAddress : DEFAULT_STATE,
    isLoading: loading,
    isError: error
  }
}

export function useRecentTransactions (wallet) {
  const { data } = useWalletQuery(RECENT_TRANSACTIONS_QUERY, wallet)
  return data ? data.recentTransactions : DEFAULT_STATE
}

export function useTransactionProject (slug) {
  const { data } = useQuery(TRANSACTION_PROJECT_QUERY, {
    variables: { slug }
  })

  return data ? data.projectBySlug : DEFAULT_STATE
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
