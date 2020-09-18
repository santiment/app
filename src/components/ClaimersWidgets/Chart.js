import React, { useMemo } from 'react'
import cx from 'classnames'
import { linearScale } from '@santiment-network/chart/scales'
import Chart from '../../ducks/Chart'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useChartColors } from '../../ducks/Chart/colors'
import { useAxesMetricsKey } from '../../ducks/Chart/hooks'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import styles from './index.module.scss'

const settings = {
  slug: 'uniswap',
  interval: '1h',
  from: '2020-09-15T00:00:00Z',
  to: '2020-09-20T00:00:00Z'
}

const chartPadding = {
  top: 16,
  right: 45,
  bottom: 20,
  left: 8
}

const UniswapChart = ({ className, metric }) => {
  const metrics = useMemo(() => [metric], [metric])
  const [data] = useTimeseries(metrics, settings)
  const categories = useMetricCategories(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)
  const MetricColor = useChartColors(metrics)

  return (
    <div className={cx(styles.widget, styles.chart)}>
      <Chart
        hideBrush
        hideWatermark
        {...categories}
        {...settings}
        data={data}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={linearScale}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        chartPadding={chartPadding}
        chartHeight={250}
        xAxesTicks={5}
        yAxesTicks={6}
        resizeDependencies={[]}
      />
    </div>
  )
}

export default UniswapChart
