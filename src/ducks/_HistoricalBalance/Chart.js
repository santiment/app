import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import SANChart from '../Chart'
import { useChartColors } from '../Chart/colors'
import { useClosestValueData, useAxesMetricsKey } from '../Chart/hooks'
import { useMetricCategories } from '../Chart/Synchronizer'
import { useTimeseries } from '../Studio/timeseries/hooks'
import styles from './Chart.module.scss'

const chartPadding = {
  top: 25,
  bottom: 25,
  right: 45,
  left: 15,
}

const Chart = ({ metrics, settings, isDesktop }) => {
  const [rawData, loadings] = useTimeseries(metrics, settings)
  const data = useClosestValueData(rawData, metrics)
  const categories = useMetricCategories(metrics)
  const MetricColor = useChartColors(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)

  return (
    <div className={styles.chart}>
      <SANChart
        {...categories}
        className={styles.canvas}
        hideBrush
        hideWatermark
        data={data}
        MetricColor={MetricColor}
        chartPadding={chartPadding}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        isCartesianGridActive
      ></SANChart>

      {loadings.length > 0 && <Loader className={styles.loader} />}

      {metrics.length === 0 && (
        <div className={styles.description}>
          Please paste the wallet address and choose supported assets in the
          forms above to see the historical data
        </div>
      )}
    </div>
  )
}

export default Chart
