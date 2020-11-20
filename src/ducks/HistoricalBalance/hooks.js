import { useState, useMemo, useEffect } from 'react'
import addressDetect from 'cryptocurrency-address-detector'
import { getWalletAssets, getAssetInfrastructure } from './queries'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'

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

export function useWalletAssets (address, infrastructure) {
  const [walletAssets, setWalletAssets] = useState(DEFAULT_STATE)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(
    () => {
      if (!address || !infrastructure) return

      setIsLoading(true)
      const walletAssets = []

      getWalletAssets(address, infrastructure)
        .then(assets =>
          Promise.all(
            assets.map(({ slug, balance }, i) =>
              getAssetInfrastructure(slug).then(infrastructure => {
                walletAssets[i] = {
                  slug,
                  infrastructure,
                  balance
                }
              })
            )
          )
        )
        .then(() => {
          setWalletAssets(walletAssets)
          setIsLoading(false)
          setIsError(false)
        })
        .catch(e => {
          setIsLoading(false)
          setIsError(e)
        })
    },
    [address, infrastructure]
  )

  return {
    walletAssets,
    isLoading,
    isError
  }
}

export function useInfrastructureDetector (address) {
  const [infrastructure, setInfrastructure] = useState()

  useEffect(
    () => {
      const abort = new AbortController()
      const detected = addressDetect(address, { signal: abort })

      detected.then(result => {
        if (result === 'Cryptocurrency could not be detected') {
          return
        }

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
