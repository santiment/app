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
import StablecoinSelector from '../StablecoinSelector/StablecoinSelector'
import { MobileOnly } from '../../../components/Responsive'
import DashboardChartHeader, {
  DashboardIntervals
} from '../../../components/DashboardMetricChart/DashboardChartHeader/DashboardChartHeader'
import {
  HOLDERS_DISTRIBUTION_6M,
  HOLDERS_DISTRIBUTION_MOBILE_INTERVALS
} from '../StablecoinsMarketCap/utils'
import { getIntervalByTimeRange } from '../../../utils/dates'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import { usePhase, Phase } from '../../Studio/phases'
import {
  checkIfWasNotMerged,
  buildMergedMetric
} from '../../Studio/Widget/HolderDistributionWidget/utils'
import styles from './StablecoinHolderDistribution.module.scss'

const DEFAULT_CHECKED_METRICS = new Set()

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
  const [checkedMetrics, setSelectedMetrics] = useState(DEFAULT_CHECKED_METRICS)
  const [metrics, setMetrics] = useState([
    HolderDistributionMetric.holders_distribution_100_to_1k,
    HolderDistributionMetric.holders_distribution_1k_to_10k
  ])
  const [mergedMetrics, setMergedMetrics] = useState([])
  const { currentPhase, setPhase } = usePhase()
  const [settings, setSettings] = useState({
    ...DEFAULT_SETTINGS,
    slug: asset.slug
  })
  const MetricColor = useChartColors(metrics)

  useEffect(
    () => {
      setSettings({
        ...settings,
        slug: asset.slug
      })
    },
    [asset]
  )

  const [data] = useTimeseries(metrics, settings)
  const allTimeData = useAllTimeData(metrics, {
    slug: asset.slug
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
    metric => {
      if (currentPhase !== Phase.IDLE) {
        return checkMetric(metric)
      }

      const found = metrics.find(x => x === metric)

      if (found) {
        setMetrics(metrics.filter(x => x !== metric))
      } else {
        setMetrics([...metrics, metric])
      }
    },
    [metrics, setMetrics, currentPhase, checkMetric]
  )

  function checkMetric (metric) {
    const newCheckedMetrics = new Set(checkedMetrics)

    if (checkedMetrics.has(metric)) {
      newCheckedMetrics.delete(metric)
    } else {
      newCheckedMetrics.add(metric)
    }

    setSelectedMetrics(newCheckedMetrics)
  }

  function onMergeClick () {
    setPhase(Phase.MAPVIEW)
  }

  function onMergeConfirmClick () {
    if (checkedMetrics.size > 1) {
      const metric = buildMergedMetric([...checkedMetrics])

      if (checkIfWasNotMerged(metric.key, mergedMetrics)) {
        setMetrics([...metrics, metric])
        setMergedMetrics([...mergedMetrics, metric])
      }
    }
    setPhase(Phase.IDLE)
    setSelectedMetrics(DEFAULT_CHECKED_METRICS)
  }

  function onUnmergeClick (metric) {
    const metricFilter = m => m !== metric
    setMetrics(metrics.filter(metricFilter))
    setMergedMetrics(mergedMetrics.filter(metricFilter))
  }

  return (
    <div className={cx(styles.container, className)}>
      <MobileOnly>
        <DashboardChartHeader title='Holder Distribution' />
      </MobileOnly>

      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <StablecoinSelector asset={asset} setAsset={setAsset} />

          <div className={styles.gaps}>
            <PaywallInfo metrics={metrics} />
          </div>
        </div>

        <Chart
          {...settings}
          {...categories}
          data={data}
          brushData={allTimeData}
          hideBrush={!isDesktop}
          onBrushChangeEnd={onBrushChangeEnd}
          chartHeight={CHART_HEIGHT}
          metrics={metrics}
          isCartesianGridActive={isDesktop}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          hideWatermark={!isDesktop}
          axesMetricKeys={isDesktop ? axesMetricKeys : []}
          resizeDependencies={isDesktop ? [axesMetricKeys] : []}
          className={styles.chart}
          chartPadding={isDesktop ? undefined : CHART_PADDING_MOBILE}
        />
      </div>

      <MobileOnly>
        <DashboardIntervals
          setInterval={onChangeInterval}
          interval={interval}
          intervals={HOLDERS_DISTRIBUTION_MOBILE_INTERVALS}
        />
      </MobileOnly>

      <div className={styles.metrics}>
        <TopHolders
          toggleMetric={toggleMetric}
          MetricColor={MetricColor}
          metrics={metrics}
          currentPhase={currentPhase}
          checkedMetrics={checkedMetrics}
          mergedMetrics={mergedMetrics}
          onMergeClick={onMergeClick}
          onMergeConfirmClick={onMergeConfirmClick}
          onUnmergeClick={onUnmergeClick}
        />
      </div>
    </div>
  )
}

export default withSizes(mapSizesToProps)(StablecoinHolderDistribution)
