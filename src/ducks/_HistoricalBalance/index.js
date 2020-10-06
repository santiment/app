import React, { useState } from 'react'
import { useWalletAssets, useWalletMetrics } from './hooks'
import Chart from './Chart'
import Configurations from './Configurations'
import AddressSetting from './Setting/Address'
import AssetsSetting from './Setting/Assets'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { withSizes } from '../../components/Responsive'
import { getIntervalByTimeRange } from '../../utils/dates'
import styles from './index.module.scss'

const DEFAULT_TIME_RANGE = '6M'
const { from: FROM, to: TO } = getIntervalByTimeRange(
  DEFAULT_TIME_RANGE.toLowerCase(),
)

const SETTINGS = {
  address: '0x609ba2969E9A807C8f450e37909F10f88E5Fc931',
  from: FROM,
  to: TO,
  interval: getNewInterval(FROM, TO),
  timeRange: DEFAULT_TIME_RANGE,
}

const DEFAULT_CHART_ASSETS = []

const HistoricalBalance = ({ isDesktop }) => {
  const [settings, setSettings] = useState(SETTINGS)
  const { walletAssets, isLoading, isError } = useWalletAssets(settings.address)
  const [chartAssets, setChartAssets] = useState(DEFAULT_CHART_ASSETS)
  const metrics = useWalletMetrics(chartAssets)

  function onAddressChange(address) {
    setSettings({
      ...settings,
      address,
    })
  }

  function changeTimePeriod(from, to, timeRange) {
    const interval = getNewInterval(from, to)

    setSettings((state) => ({
      ...state,
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: from.toISOString(),
      to: to.toISOString(),
    }))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <AddressSetting
          address={settings.address}
          isError={isError}
          onAddressChange={onAddressChange}
        ></AddressSetting>
        <AssetsSetting
          walletAssets={walletAssets}
          chartAssets={chartAssets}
          isLoading={isLoading}
          setChartAssets={setChartAssets}
        ></AssetsSetting>
      </div>
      <Configurations
        settings={settings}
        chartAssets={chartAssets}
        changeTimePeriod={changeTimePeriod}
        isDesktop={isDesktop}
      >
        <Chart
          settings={settings}
          metrics={metrics}
          isDesktop={isDesktop}
        ></Chart>
      </Configurations>
    </div>
  )
}

export default withSizes(HistoricalBalance)
