import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../utils/withSizes'
import { HolderDistributionMetric } from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics'
import TopHolders from '../../Studio/Chart/Sidepanel/HolderDistribution'
import { useAllTimeData, useTimeseries } from '../../Studio/timeseries/hooks'
import { useChartColors } from '../../Chart/colors'
import Chart from '../../Chart'
import { useAxesMetricsKey } from '../../Chart/hooks'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import ActiveMetrics from '../../Studio/Chart/ActiveMetrics'
import StablecoinSelector from '../StablecoinSelector/StablecoinSelector'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import StablecoinsHeader, {
  StablecoinsIntervals
} from '../StablecoinsMarketCap/MarketCapHeader/StablecoinsHeader'
import {
  HOLDERS_DISTRIBUTION_6M,
  HOLDERS_DISTRIBUTION_MOBILE_INTERVALS
} from '../StablecoinsMarketCap/utils'
import { getIntervalByTimeRange } from '../../../utils/dates'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import { useMetricsMerge } from '../../Studio/Widget/HolderDistributionWidget'
import styles from './StablecoinHolderDistribution.module.scss'
import { deduceItems } from '../../Studio'

const CHART_HEIGHT = 524

const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

export const DEFAULT_STABLECOIN = {
  id: '1552',
  name: 'Tether',
  slug: 'tether',
  ticker: 'USDT',
  rank: 4,
  marketcapUsd: 10010463777.928583,
  __typename: 'Project'
}

const DEFAULT_SETTINGS = {
  ...getIntervalByTimeRange('183d'),
  interval: '1d'
}

const StablecoinHolderDistribution = ({ isDesktop, className }) => {
  const [interval, setInterval] = useState(HOLDERS_DISTRIBUTION_6M)
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN)
  const [metrics, setMetrics] = useState([
    HolderDistributionMetric.holders_distribution_100_to_1k,
    HolderDistributionMetric.holders_distribution_1k_to_10k,
    HolderDistributionMetric.percent_of_holders_distribution_combined_balance_100_to_1k,
    HolderDistributionMetric.percent_of_holders_distribution_combined_balance_1k_to_10k
  ])

  const [settings, setSettings] = useState({
    ...DEFAULT_SETTINGS,
    slug: asset.slug
  })

  useEffect(
    () => {
      setSettings({
        ...settings,
        slug: asset.slug
      })
    },
    [asset]
  )

  const [data, loadings, errors] = useTimeseries(metrics, settings)
  const allTimeData = useAllTimeData(metrics, {
    slug: asset.slug,
    interval: undefined
  })

  const onBrushChangeEnd = useCallback(
    (startIndex, endIndex) => {
      const from = new Date(allTimeData[startIndex].datetime)
      const to = new Date(allTimeData[endIndex].datetime)

      setSettings({ ...settings, from, to })
    },
    [data, setSettings, settings, allTimeData]
  )

  const onChangeInterval = useCallback(
    interval => {
      setInterval(interval)
      setSettings({
        ...settings,
        ...getIntervalByTimeRange(interval.value)
      })
    },
    [settings, setSettings, setInterval]
  )

  const axesMetricKeys = useAxesMetricsKey([...metrics].reverse())
  const categories = metricsToPlotCategories(metrics, {})

  const toggleMetric = useCallback(
    (widget, metric) => {
      const metricsList = Array.isArray(metric)
        ? metric
        : deduceItems(metrics, metric)

      setMetrics(metricsList)
    },
    [metrics, setMetrics]
  )

  const MetricColor = useChartColors(metrics)

  const updateWidget = useCallback(({ metrics }) => setMetrics(metrics), [
    setMetrics
  ])

  const {
    onMergeConfirmClick,
    onMergeClick,
    onUnmergeClick,
    currentPhase,
    mergedMetrics,
    checkedMetrics,
    toggleWidgetMetricWrapper
  } = useMetricsMerge({
    toggleWidgetMetric: toggleMetric,
    widget: {
      mergedMetrics: [],
      metrics: [...metrics]
    },
    updateWidget
  })

  return (
    <div className={cx(styles.container, className)}>
      <MobileOnly>
        <StablecoinsHeader title='Holder Distribution' />
      </MobileOnly>

      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <StablecoinSelector asset={asset} setAsset={setAsset} />

          <div className={styles.gaps}>
            <PaywallInfo metrics={metrics} />
          </div>
        </div>

        <DesktopOnly>
          <div className={styles.metricBtns}>
            <ActiveMetrics
              className={styles.metricBtn}
              MetricColor={MetricColor}
              toggleMetric={metric => toggleMetric(undefined, metric)}
              loadings={loadings}
              activeMetrics={metrics}
              ErrorMsg={errors}
              project={asset}
            />
          </div>
        </DesktopOnly>

        <Chart
          {...settings}
          {...categories}
          data={data}
          brushData={allTimeData}
          chartHeight={CHART_HEIGHT}
          metrics={[...metrics, ...mergedMetrics]}
          isCartesianGridActive={isDesktop}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          hideWatermark={!isDesktop}
          axesMetricKeys={isDesktop ? axesMetricKeys : []}
          resizeDependencies={isDesktop ? [axesMetricKeys] : []}
          className={styles.chart}
          hideBrush={!isDesktop}
          onBrushChangeEnd={onBrushChangeEnd}
          chartPadding={isDesktop ? undefined : CHART_PADDING_MOBILE}
        />
      </div>

      <MobileOnly>
        <StablecoinsIntervals
          setInterval={onChangeInterval}
          interval={interval}
          intervals={HOLDERS_DISTRIBUTION_MOBILE_INTERVALS}
        />
      </MobileOnly>

      <div className={styles.metrics}>
        <TopHolders
          classes={styles}
          MetricColor={MetricColor}
          metrics={metrics}
          currentPhase={currentPhase}
          mergedMetrics={mergedMetrics}
          checkedMetrics={checkedMetrics}
          toggleMetric={toggleWidgetMetricWrapper}
          onMergeClick={onMergeClick}
          onMergeConfirmClick={onMergeConfirmClick}
          onUnmergeClick={onUnmergeClick}
          btnProps={{
            fluid: false,
            variant: 'ghost',
            loading: loadings,
            className: styles.holderMetricBtn
          }}
        />
      </div>
    </div>
  )
}

export default withSizes(mapSizesToProps)(StablecoinHolderDistribution)
