import React from 'react'
import { DATA } from './data'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks'
import { useMetricCategories } from '../../../ducks/Chart/Synchronizer'
import Chart from '../../../ducks/Chart'
import styles from '../index.module.scss'

const TOTAL_CLAIMED_METRIC = {
  key: 'uniswap_total_claimed',
  label: 'Uniswap Total Claimed',
  node: 'line'
}

const metrics = [TOTAL_CLAIMED_METRIC]

const settings = {
  slug: 'uniswap',
  interval: '1h',
  from: '2020-09-15T00:00:00Z',
  to: '2020-09-20T00:00:00Z'
}

const eventsData = []

const axesMetricKeys = [TOTAL_CLAIMED_METRIC.key]
const MetricColor = {
  [TOTAL_CLAIMED_METRIC.key]: 'green'
}

const AmountClaimedChart = ({ className }) => {
  /* const [data] = useTimeseries(metrics, settings) */
  const categories = useMetricCategories(metrics)

  /* const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive) */
  /* const MetricColor = useChartColors(metrics) */

  return (
    <div className={className}>
      <Chart
        hideBrush
        hideAxes
        hideWatermark
        {...categories}
        // {...options}
        {...settings}
        // data={data}
        data={DATA}
        // events={eventsData}
        // className={cx(styles.chart, isBlurred && styles.blur)}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={linearScale}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        resizeDependencies={[]}
      />
    </div>
  )
}

export default AmountClaimedChart
