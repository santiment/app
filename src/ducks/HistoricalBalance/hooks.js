import { useState, useMemo, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import { useProjects } from '../Studio/Compare/withProjects'
import addressDetect from 'cryptocurrency-address-detector'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($selector: AddressSelectorInputObject!) {
    assetsHeldByAddress(selector: $selector) {
      slug
      balance
    }
  }
`

const DEFAULT_STATE = []

export function getWalletMetrics (
  allProjects,
  walletAssets,
  priceAssets,
  address
) {
  const walletMetrics =
    allProjects.length > 0
      ? walletAssets.map(item =>
        walletMetricBuilder(item, allProjects, address)
      )
      : []
  const priceMetrics = priceAssets.map(priceMetricBuilder)
  return walletMetrics.concat(priceMetrics)
}

export const useWalletMetrics = (walletAssets, priceAssets, infrastructure) => {
  const [allProjects] = useProjects()

  return useMemo(
    () =>
      getWalletMetrics(allProjects, walletAssets, priceAssets, infrastructure),
    [walletAssets, priceAssets, allProjects, infrastructure]
  )
}

export function useWalletAssets ({ address, infrastructure, skip }) {
  const { data, loading, error } = useQuery(WALLET_ASSETS_QUERY, {
    skip: skip || !address,
    variables: {
      selector: {
        address,
        infrastructure
      }
    }
  })

  const walletAssets = data ? data.assetsHeldByAddress : DEFAULT_STATE
  return {
    walletAssets,
    isLoading: loading,
    isError: error
  }
}

export const useInfrastructureDetector = address => {
  const [infrastructure, setInfrastructure] = useState()

  useEffect(
    () => {
      const abort = new AbortController()
      const detected = addressDetect(address, { signal: abort })

      detected.then(result => {
        if (result === 'BTC/BCH') {
          return setInfrastructure('BTC')
        }

        setInfrastructure(result)
      })

      return () => {
        abort.abort()
      }
    },
    [address]
  )

  return infrastructure
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
