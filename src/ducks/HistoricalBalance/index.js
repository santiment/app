import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { ASSETS_LIMIT, withDefaults } from './defaults'
import { useSettings, useWalletAssets } from './hooks'
import Chart from './Chart'
import AddressSetting from './Address'
import Comments from './Comments'
import AddressTransactions from './AddressTransactions'
// import Sankey from './Sankey'
import { withSizes, DesktopOnly } from '../../components/Responsive'
import { Infrastructure } from '../../utils/address'
import styles from './index.module.scss'

const Sankey = () => null

const HistoricalBalance = ({
  children,
  defaultSettings,
  defaultChartAssets,
  defaultPriceAssets,
  defaultIsLog,
  isPhone,
}) => {
  const { settings, changeTimePeriod, onAddressChange } = useSettings(defaultSettings)
  const { walletAssets, isLoading, isError } = useWalletAssets(settings)
  const [chartAssets, setChartAssets] = useState(defaultChartAssets)

  const [priceAssets, setPriceAssets] = useState(defaultPriceAssets)
  const [isLog, setIsLog] = useState(defaultIsLog)

  useEffect(() => {
    if (chartAssets.length) return
    if (!walletAssets.length) return

    setChartAssets(walletAssets.slice(0, 1))
  }, [walletAssets])

  useEffect(() => {
    const priceAssetsSet = new Set(priceAssets)
    const priceAssetsToDelete = new Set(priceAssetsSet)

    chartAssets.forEach(({ slug }) => priceAssetsToDelete.delete(slug))
    priceAssetsToDelete.forEach((asset) => priceAssetsSet.delete(asset))

    setPriceAssets([...priceAssetsSet])
  }, [chartAssets])

  function togglePriceAsset(asset) {
    const priceAssetsSet = new Set(priceAssets)

    if (priceAssetsSet.has(asset)) {
      priceAssetsSet.delete(asset)
    } else {
      priceAssetsSet.add(asset)
    }

    setPriceAssets([...priceAssetsSet])
  }

  function updateChartAssets(asset) {
    if (Array.isArray(asset)) {
      setChartAssets(asset.map((item) => ({ ...item.value })))
    } else {
      if (chartAssets.length + 1 > ASSETS_LIMIT) return

      setChartAssets([...chartAssets, asset.value])

      const { slug } = asset.value
      if (!priceAssets.includes(slug)) {
        setPriceAssets([...priceAssets, slug])
      }
    }
  }

  return (
    <>
      <AddressSetting
        className={isPhone && styles.address_phone}
        settings={settings}
        walletAssets={walletAssets}
        chartAssets={chartAssets}
        isError={isError}
        onAddressChange={onAddressChange}
      />

      <Chart
        className={styles.chart}
        canvasClassName={styles.canvas}
        height={isPhone ? 340 : 450}
        settings={settings}
        chartAssets={chartAssets}
        priceAssets={priceAssets}
        walletAssets={walletAssets}
        isPhone={isPhone}
        isLog={isLog}
        isLoading={isLoading}
        togglePriceAsset={togglePriceAsset}
        changeTimePeriod={changeTimePeriod}
        setChartAssets={updateChartAssets}
        setIsLog={setIsLog}
      >
        <DesktopOnly>
          {settings.infrastructure === Infrastructure.ETH && <Sankey settings={settings} />}
        </DesktopOnly>
      </Chart>

      <div className={cx(styles.bottom, isPhone && styles.bottom_phone)}>
        <div className={styles.left}>
          <AddressTransactions settings={settings} walletAssets={walletAssets} />
        </div>
        <div className={styles.right}>
          <Comments settings={settings} />
        </div>
      </div>

      {React.Children.map(
        children,
        (child) =>
          child &&
          React.cloneElement(child, {
            settings,
            chartAssets,
            priceAssets,
            isLog,
            onAddressChange,
          }),
      )}
    </>
  )
}

HistoricalBalance.defaultProps = {
  defaultChartAssets: [],
  defaultPriceAssets: [],
  defaultIsLog: false,
}

export default withDefaults(withSizes(HistoricalBalance))
