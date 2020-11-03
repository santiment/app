import { useState, useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import { useProjects } from '../Studio/Compare/withProjects'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!) {
    assetsHeldByAddress(address: $address) {
      slug
      balance
    }
  }
`

const DEFAULT_STATE = []

export function getWalletMetrics (allProjects, walletAssets, priceAssets) {
  const walletMetrics =
    allProjects.length > 0
      ? walletAssets.map(item => walletMetricBuilder(item, allProjects))
      : []
  const priceMetrics = priceAssets.map(priceMetricBuilder)
  return walletMetrics.concat(priceMetrics)
}

export const useWalletMetrics = (walletAssets, priceAssets) => {
  const [allProjects] = useProjects()

  return useMemo(
    () => getWalletMetrics(allProjects, walletAssets, priceAssets),
    [walletAssets, priceAssets, allProjects]
  )
}

export function useWalletAssets (address) {
  const { data, loading, error } = useQuery(WALLET_ASSETS_QUERY, {
    skip: !address,
    variables: {
      address
    }
  })

  const walletAssets = data ? data.assetsHeldByAddress : DEFAULT_STATE
  return {
    walletAssets,
    isLoading: loading,
    isError: error
  }
}

export function useSettings (defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings)

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
