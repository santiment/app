import { useState, useMemo, useEffect } from 'react'
import { getWalletAssets, getAssetInfrastructure } from './queries'
import {
  getValidInterval,
  walletMetricBuilder,
  priceMetricBuilder
} from './utils'
import { getAddressInfrastructure } from '../../utils/address'

const DEFAULT_STATE = []

export function getWalletMetrics (walletAssets, priceAssets) {
  const walletMetrics = walletAssets.map(walletMetricBuilder)
  const priceMetrics = priceAssets.map(priceMetricBuilder)
  return walletMetrics.concat(priceMetrics)
}

export const useWalletMetrics = (walletAssets, priceAssets) => {
  const metrics = useMemo(() => getWalletMetrics(walletAssets, priceAssets), [
    walletAssets,
    priceAssets
  ])

  const MetricSettingMap = useMemo(
    () => {
      const MetricSettingMap = new Map()

      walletAssets.forEach(metric => {
        MetricSettingMap.set(metric, {
          ...metric.reqMeta
        })
      })

      return MetricSettingMap
    },
    [walletAssets]
  )

  return [metrics, MetricSettingMap]
}

export function useWalletAssets ({ address, infrastructure }) {
  const [walletAssets, setWalletAssets] = useState(DEFAULT_STATE)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(
    () => {
      if (!address || !infrastructure) return

      setIsLoading(true)
      const walletAssets = []
      let race = false

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
          if (race) return

          setWalletAssets(walletAssets)
          setIsLoading(false)
          setIsError(false)
        })
        .catch(e => {
          if (race) return

          setIsLoading(false)
          setIsError(e)
        })

      return () => (race = true)
    },
    [address, infrastructure]
  )

  return {
    walletAssets,
    isLoading,
    isError
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
