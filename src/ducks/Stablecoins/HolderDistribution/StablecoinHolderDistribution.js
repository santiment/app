import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { CHECKING_STABLECOINS } from '../StablecoinsMarketCap/utils'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import Select from '@santiment-network/ui/Search/Select/Select'
import { TopHolderMetric } from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics'
import TopHolders from '../../Studio/Chart/Sidepanel/HolderDistribution'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { getIntervalDates } from '../StablecoinsMarketCap/StablecoinsMarketCap'
import { useChartColors } from '../../Chart/colors'
import Chart from '../../Chart'
import { useAxesMetricsKey } from '../../Chart/hooks'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import styles from './StablecoinHolderDistribution.module.scss'

const METRIC_SETTINGS_MAP = new Map()
const METRIC_TRANSFORMER = {}

const CHART_HEIGHT = 400

const CHART_PADDING = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const StablecoinHolderDistribution = ({ className }) => {
  const [asset, setAsset] = useState(CHECKING_STABLECOINS[0])
  const [metrics, setMetrics] = useState([
    TopHolderMetric.holders_distribution_100_to_1k,
    TopHolderMetric.holders_distribution_1k_to_10k
  ])

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

  const [settings, setSettings] = useState({
    ...getIntervalDates({
      value: '63d'
    })
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

  const [data, loadings] = useTimeseries(
    metrics,
    settings,
    METRIC_SETTINGS_MAP,
    METRIC_TRANSFORMER
  )
  const [brushBorder, setBrushBorder] = useState()
  const [brushData, setBrushData] = useState([])

  useEffect(
    () => {
      if (brushBorder) {
        const { from, to } = brushBorder
        setBrushData(data.slice(from, to))
      } else {
        setBrushData(data)
      }
    },
    [data, brushBorder]
  )

  const axesMetricKeys = useAxesMetricsKey(metrics)
  const categories = metricsToPlotCategories(metrics, {})

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <div className={styles.projectIcon}>
            <ProjectIcon slug={asset.slug} size={20} />
          </div>

          <Select
            clearable={false}
            value={asset}
            options={CHECKING_STABLECOINS}
            onChange={value => {
              setAsset(value)
            }}
          />
        </div>

        <Chart
          {...settings}
          {...categories}
          data={data}
          brushData={brushData}
          chartHeight={CHART_HEIGHT}
          metrics={metrics}
          chartPadding={CHART_PADDING}
          resizeDependencies={[]}
          isCartesianGridActive={true}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          axesMetricKeys={axesMetricKeys}
          className={styles.chart}
          onBrushChangeEnd={(from, to) => {
            setBrushBorder({
              from,
              to
            })
          }}
        />
      </div>

      <div className={styles.metrics}>
        <div className={styles.holdersTitle}>Holders Distribution</div>

        <TopHolders
          toggleMetric={toggleMetric}
          MetricColor={MetricColor}
          metrics={metrics}
          className={styles.metricBtn}
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
