import React, { useMemo } from 'react'
import cx from 'classnames'
import { linearScale } from '@santiment-network/chart/scales'
import { toEndOfDay } from '../../utils/dates'
import Chart from '../../ducks/Chart'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useAxesMetricsKey } from '../../ducks/Chart/hooks'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import styles from './index.module.scss'

const settings = {
  slug: 'uniswap',
  interval: '15m',
  from: '2020-09-16T00:00:00Z',
  to: toEndOfDay(new Date()).toISOString(),
}

const chartPadding = {
  top: 16,
  right: 45,
  bottom: 20,
  left: 8,
}

const UniswapChart = ({ className, metrics, height, ...props }) => {
  const metric = metrics[0]
  const [data] = useTimeseries(metrics, settings)
  const categories = useMetricCategories(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)
  const MetricColor = useMemo(() => ({ [metric.key]: metric.color }), metrics)

  return (
    <div className={cx(styles.widget, styles.chart)}>
      <Chart
        {...props}
        {...categories}
        {...settings}
        hideBrush
        hideWatermark
        isCartesianGridActive
        data={data}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={linearScale}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        chartPadding={chartPadding}
        chartHeight={height}
        xAxesTicks={5}
        yAxesTicks={6}
        resizeDependencies={[]}
      />
    </div>
  )
}

UniswapChart.defaultProps = {
  height: 270,
}

export default UniswapChart
