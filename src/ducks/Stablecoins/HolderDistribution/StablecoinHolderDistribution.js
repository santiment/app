import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { TopHolderMetric } from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics'
import TopHolders from '../../Studio/Chart/Sidepanel/HolderDistribution'
import { useAllTimeData, useTimeseries } from '../../Studio/timeseries/hooks'
import { useChartColors } from '../../Chart/colors'
import Chart from '../../Chart'
import { useAxesMetricsKey } from '../../Chart/hooks'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import { Metric } from '../../dataHub/metrics'
import ActiveMetrics from '../../Studio/Chart/ActiveMetrics'
import { getIntervalByTimeRange } from '../../../utils/dates'
import StablecoinSelector from '../StablecoinSelector/StablecoinSelector'
import styles from './StablecoinHolderDistribution.module.scss'

const CHART_HEIGHT = 524

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
  ...getIntervalByTimeRange('1y')
}

const StablecoinHolderDistribution = ({ className }) => {
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN)
  const [metrics, setMetrics] = useState([
    Metric.price_usd,
    TopHolderMetric.holders_distribution_100_to_1k,
    TopHolderMetric.holders_distribution_1k_to_10k
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

  const axesMetricKeys = useAxesMetricsKey([...metrics].reverse())
  const categories = metricsToPlotCategories(metrics, {})

  const toggleMetric = useCallback(
    metric => {
      const found = metrics.find(x => x === metric)

      if (found) {
        setMetrics(metrics.filter(x => x !== metric))
      } else {
        setMetrics([...metrics, metric])
      }
    },
    [metrics, setMetrics]
  )

  const MetricColor = useChartColors(metrics)

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <StablecoinSelector asset={asset} setAsset={setAsset} />
        </div>

        <div className={styles.metricBtns}>
          <ActiveMetrics
            className={styles.metricBtn}
            MetricColor={MetricColor}
            toggleMetric={toggleMetric}
            loadings={loadings}
            activeMetrics={metrics}
            ErrorMsg={errors}
            project={asset}
          />
        </div>

        <Chart
          {...settings}
          {...categories}
          data={data}
          brushData={allTimeData}
          chartHeight={CHART_HEIGHT}
          metrics={metrics}
          isCartesianGridActive={true}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          axesMetricKeys={axesMetricKeys}
          resizeDependencies={[axesMetricKeys]}
          className={styles.chart}
          onBrushChangeEnd={onBrushChangeEnd}
        />
      </div>

      <div className={styles.metrics}>
        <div className={styles.holdersTitle}>Holders Distribution</div>

        <TopHolders
          toggleMetric={toggleMetric}
          MetricColor={MetricColor}
          metrics={metrics}
          className={styles.holderMetricBtn}
          btnProps={{
            fluid: false,
            variant: 'ghost',
            loading: loadings
          }}
        />
      </div>
    </div>
  )
}

export default StablecoinHolderDistribution
