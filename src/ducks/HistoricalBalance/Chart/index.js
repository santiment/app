import React from 'react'
import cx from 'classnames'
import { logScale, linearScale } from '@santiment-network/chart/scales'
import Canvas, { useResponsiveTicks } from './Canvas'
import Assets from './Assets'
import DatePicker from './DatePicker'
import SettingsMenu from './SettingsMenu'
import { useWalletMetrics } from '../hooks'
import styles from './index.module.scss'

const Configurations = ({
  height,
  settings,
  chartAssets,
  priceAssets,
  walletAssets,
  isLog,
  isPhone,
  isLoading,
  togglePriceAsset,
  changeTimePeriod,
  setIsLog,
  setChartAssets
}) => {
  const metrics = useWalletMetrics(chartAssets, priceAssets)
  const axesTicks = useResponsiveTicks(isPhone)

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.header, isPhone && styles.header_phone)}>
        <Assets
          className={
            isPhone ? styles.settings__assets_phone : styles.settings__assets
          }
          walletAssets={walletAssets}
          chartAssets={chartAssets}
          isLoading={isLoading}
          setChartAssets={setChartAssets}
        />

        <div className={styles.right}>
          <DatePicker
            settings={settings}
            isPhone={isPhone}
            changeTimePeriod={changeTimePeriod}
          />
          <SettingsMenu
            isLog={isLog}
            settings={settings}
            chartAssets={chartAssets}
            priceAssets={priceAssets}
            togglePriceAsset={togglePriceAsset}
            setIsLog={setIsLog}
          />
        </div>
      </div>
      <Canvas
        axesTicks={axesTicks}
        height={height}
        scale={isLog ? logScale : linearScale}
        settings={settings}
        metrics={metrics}
      />
    </div>
  )
}

export default Configurations
