import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import MarketCapHeader, {
  MARKET_CAP_MONTH_INTERVAL
} from './MarketCapHeader/MarketCapHeader'
import CheckingAssets from './CheckingAssets/CheckingAssets'
import { convertToSeconds } from '../../dataHub/metrics/intervals'
import Chart from '../../Chart'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import {
  METRIC_SETTINGS_MAP,
  METRIC_TRANSFORMER,
  STABLE_COINS_METRICS
} from './utils'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { useChartMetrics, useMetricColors } from './hooks'
import styles from './StablecoinsMarketCap.module.scss'

export const getIntervalDates = interval => {
  return {
    from: new Date(
      new Date().getTime() + -1 * convertToSeconds(interval.value)
    ),
    to: new Date()
  }
}

const CHART_HEIGHT = 400
const CHART_PADDING = {
  top: 32,
  right: 74,
  bottom: 58,
  left: 24
}

const StablecoinsMarketCap = ({ className }) => {
  const [interval, setInterval] = useState(MARKET_CAP_MONTH_INTERVAL)
  const [disabledAssets, setDisabledAsset] = useState({})

  const [settings, setSettings] = useState({ ...getIntervalDates(interval) })

  useEffect(
    () => {
      setSettings({ ...getIntervalDates(interval) })
    },
    [interval]
  )

  const chartMetrics = useChartMetrics(STABLE_COINS_METRICS)

  const [data, loadings] = useTimeseries(
    STABLE_COINS_METRICS,
    settings,
    METRIC_SETTINGS_MAP,
    METRIC_TRANSFORMER
  )

  const MetricColor = useMetricColors(STABLE_COINS_METRICS)

  const filteredMetrics = useMemo(
    () => chartMetrics.filter(({ slug }) => !disabledAssets[slug]),
    [chartMetrics, disabledAssets]
  )

  const categories = metricsToPlotCategories(filteredMetrics, {})

  const xAxisKey = (filteredMetrics[0] || {}).key

  return (
    <div className={cx(styles.container, className)}>
      <MarketCapHeader interval={interval} setInterval={setInterval} />

      <CheckingAssets
        loadings={loadings}
        toggleDisabled={setDisabledAsset}
        disabledAssets={disabledAssets}
      />

      <Chart
        {...settings}
        {...categories}
        data={data}
        chartHeight={CHART_HEIGHT}
        metrics={filteredMetrics}
        isCartesianGridActive={true}
        hideWatermark
        hideBrush
        chartPadding={CHART_PADDING}
        resizeDependencies={[]}
        MetricColor={MetricColor}
        tooltipKey={xAxisKey}
        axesMetricKeys={[xAxisKey]}
      />
    </div>
  )
}

export default StablecoinsMarketCap
