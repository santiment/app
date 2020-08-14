import React, { useEffect, useState } from 'react'
import MarketCapHeader, {
  MARKET_CAP_HOUR_INTERVAL,
  MARKET_CAP_MONTH_INTERVAL
} from './MarketCapHeader/MarketCapHeader'
import styles from './StablecoinsMarketCap.module.scss'
import CheckingAssets from './CheckingAssets/CheckingAssets'
import { convertToSeconds } from '../../dataHub/metrics/intervals'

const getDates = interval => {
  console.log('interval', interval)
  return {
    from: new Date(
      new Date().getTime() + -1 * convertToSeconds(interval.value)
    ),
    to: new Date()
  }
}

const StablecoinsMarketCap = () => {
  const [interval, setInterval] = useState(MARKET_CAP_MONTH_INTERVAL)
  const [disabledAssets, setDisabledAsset] = useState()

  const [settings, setSettings] = useState({ ...getDates(interval) })

  useEffect(
    () => {
      setSettings({ ...getDates(interval) })
    },
    [interval]
  )

  return (
    <div className={styles.container}>
      <MarketCapHeader interval={interval} setInterval={setInterval} />

      <CheckingAssets
        settings={settings}
        toggleDisabled={setDisabledAsset}
        disabledAssets={disabledAssets}
      />
    </div>
  )
}

export default StablecoinsMarketCap
