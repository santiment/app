import { useState, useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!) {
    assetsHeldByAddress(address: $address) {
      slug
      balance
    }
  }
`

const DEFAULT_STATE = []

const metricBuilder = (slugToMetric) => (asset) => {
  const metric = slugToMetric(asset)
  updateTooltipSetting(metric)
  return metric
}

const walletMetricBuilder = metricBuilder(({ slug }) => ({
  key: slug,
  label: slug,
  node: 'line',
  queryKey: 'historicalBalance',
  reqMeta: {
    slug,
    infrastructure: 'ETH',
  },
}))

const priceMetricBuilder = metricBuilder((slug) => ({
  key: `hb_price_usd_${slug}`,
  label: `Price of ${slug}`,
  node: 'line',
  queryKey: 'price_usd',
  reqMeta: {
    slug,
  },
}))

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

export function getWalletMetrics(walletAssets, priceAssets) {
  const walletMetrics = walletAssets.map(walletMetricBuilder)
  const priceMetrics = priceAssets.map(priceMetricBuilder)
  return walletMetrics.concat(priceMetrics)
}

export const useWalletMetrics = (walletAssets, priceAssets) =>
  useMemo(() => getWalletMetrics(walletAssets, priceAssets), [
    walletAssets,
    priceAssets,
  ])

export function getValidInterval(from, to) {
  const interval = getNewInterval(from, to)
  return INTERVAL_ALIAS[interval] || interval
}

export function useSettings(defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings)

  function onAddressChange(address) {
    setSettings({
      ...settings,
      address,
    })
  }

  function changeTimePeriod(from, to, timeRange) {
    setSettings((state) => ({
      ...state,
      timeRange,
      interval: getValidInterval(from, to),
      from: from.toISOString(),
      to: to.toISOString(),
    }))
  }

  return {
    settings,
    changeTimePeriod,
    onAddressChange,
  }
}
