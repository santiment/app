import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import MarketCapHeader, {
  MARKET_CAP_DAY_INTERVAL,
  MarketcapIntervals
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
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import { mapSizesToProps } from '../../../utils/withSizes'
import styles from './StablecoinsMarketCap.module.scss'

export const getIntervalDates = interval => {
  return {
    from: new Date(
      new Date().getTime() + -1 * convertToSeconds(interval.value)
    ),
    to: new Date(),
    interval: '1h'
  }
}

const CHART_HEIGHT = 400
const CHART_PADDING_DESKTOP = {
  top: 32,
  right: 74,
  bottom: 58,
  left: 24
}
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const StablecoinsMarketCap = ({ isDesktop, className }) => {
  const [interval, setInterval] = useState(MARKET_CAP_DAY_INTERVAL)
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
      <MarketCapHeader title='Stablecoins Market Cap'>
        <DesktopOnly>
          <MarketcapIntervals interval={interval} setInterval={setInterval} />
        </DesktopOnly>
      </MarketCapHeader>

      <DesktopOnly>
        <CheckingAssets
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledAssets={disabledAssets}
        />
      </DesktopOnly>

      <Chart
        {...settings}
        {...categories}
        data={data}
        chartHeight={CHART_HEIGHT}
        metrics={filteredMetrics}
        isCartesianGridActive={false}
        hideWatermark
        hideBrush
        chartPadding={isDesktop ? CHART_PADDING_DESKTOP : CHART_PADDING_MOBILE}
        resizeDependencies={[]}
        MetricColor={MetricColor}
        tooltipKey={xAxisKey}
        axesMetricKeys={isDesktop ? [xAxisKey] : []}
      />

      <MobileOnly>
        <MarketcapIntervals interval={interval} setInterval={setInterval} />
        <CheckingAssets
          loadings={loadings}
          toggleDisabled={setDisabledAsset}
          disabledAssets={disabledAssets}
        />
      </MobileOnly>
    </div>
  )
}

export default withSizes(mapSizesToProps)(StablecoinsMarketCap)
