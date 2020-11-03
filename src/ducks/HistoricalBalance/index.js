import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { logScale, linearScale } from '@santiment-network/chart/scales'
import { MAX_ASSETS_NUMBER, withDefaults } from './defaults'
import { useSettings, useWalletAssets, useWalletMetrics } from './hooks'
import Chart, { useResponsiveTicks } from './Chart'
import Configurations from './Configurations'
import AddressSetting from './Setting/Address'
import AssetsSetting from './Setting/Assets'
import { withSizes } from '../../components/Responsive'
import styles from './index.module.scss'

const HistoricalBalance = ({
  children,
  defaultSettings,
  defaultChartAssets,
  defaultPriceAssets,
  defaultIsLog,
  isPhone
}) => {
  const { settings, changeTimePeriod, onAddressChange } = useSettings(
    defaultSettings
  )
  const { walletAssets, isLoading, isError } = useWalletAssets(settings.address)
  const [chartAssets, setChartAssets] = useState(defaultChartAssets)
  const [priceAssets, setPriceAssets] = useState(defaultPriceAssets)
  const [isLog, setIsLog] = useState(defaultIsLog)
  const metrics = useWalletMetrics(chartAssets, priceAssets)
  const axesTicks = useResponsiveTicks(isPhone)

  useEffect(
    () => {
      const priceAssetsSet = new Set(priceAssets)
      const priceAssetsToDelete = new Set(priceAssetsSet)

      chartAssets.forEach(({ slug }) => priceAssetsToDelete.delete(slug))
      priceAssetsToDelete.forEach(asset => priceAssetsSet.delete(asset))

      setPriceAssets([...priceAssetsSet])
    },
    [chartAssets]
  )

  function togglePriceAsset (asset) {
    const priceAssetsSet = new Set(priceAssets)

    if (priceAssetsSet.has(asset)) {
      priceAssetsSet.delete(asset)
    } else {
      priceAssetsSet.add(asset)
    }

    setPriceAssets([...priceAssetsSet])
  }

  function updateChartAssets (newChartAssets) {
    const { length } = newChartAssets
    if (length > MAX_ASSETS_NUMBER) return

    const lastAsset = newChartAssets[length - 1]
    if (chartAssets.length < length && lastAsset) {
      const { slug } = lastAsset
      if (!priceAssets.includes(slug)) {
        setPriceAssets([...priceAssets, slug])
      }
    }

    setChartAssets(newChartAssets)
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.settings, isPhone && styles.settings_phone)}>
        <AddressSetting
          address={settings.address}
          isError={isError}
          onAddressChange={onAddressChange}
        />
        <AssetsSetting
          className={
            isPhone ? styles.settings__assets_phone : styles.settings__assets
          }
          walletAssets={walletAssets}
          chartAssets={chartAssets}
          isLoading={isLoading}
          setChartAssets={updateChartAssets}
        />
      </div>

      <Configurations
        isLog={isLog}
        settings={settings}
        chartAssets={chartAssets}
        priceAssets={priceAssets}
        isPhone={isPhone}
        togglePriceAsset={togglePriceAsset}
        changeTimePeriod={changeTimePeriod}
        setIsLog={setIsLog}
      >
        <Chart
          axesTicks={axesTicks}
          height={isPhone ? 340 : 450}
          scale={isLog ? logScale : linearScale}
          settings={settings}
          metrics={metrics}
        />
      </Configurations>

      {React.Children.map(children, child =>
        React.cloneElement(child, {
          settings,
          chartAssets,
          priceAssets,
          isLog
        })
      )}
    </div>
  )
}

HistoricalBalance.defaultProps = {
  defaultChartAssets: [],
  defaultPriceAssets: [],
  defaultIsLog: false
}

export default withDefaults(withSizes(HistoricalBalance))
