import React from 'react'
import cx from 'classnames'
import { linearScale } from '@santiment-network/chart/scales'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import { useChartColors } from '../../ducks/Chart/colors'
import { useAxesMetricsKey } from '../../ducks/Chart/hooks'
import Chart from '../../ducks/Chart'
import styles from './index.module.scss'

const settings = {
  slug: 'uniswap',
  interval: '1h',
  from: '2020-09-15T00:00:00Z',
  to: '2020-09-20T00:00:00Z'
}

const chartPadding = {
  top: 16,
  right: 40,
  bottom: 20,
  left: 8
}

const AmountClaimedChart = ({ className, metrics }) => {
  const [data] = useTimeseries(metrics, settings)
  const categories = useMetricCategories(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)
  const MetricColor = useChartColors(metrics)

  return (
    <div className={cx(styles.widget, styles.chart)}>
      <Chart
        hideBrush
        // hideAxes
        hideWatermark
        {...categories}
        {...settings}
        // useCustomTooltip
        data={data}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={linearScale}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        chartPadding={chartPadding}
        chartHeight={250}
        resizeDependencies={[]}
        // onPlotTooltip={onHover}

        xAxesTicks={5}
        yAxesTicks={6}
      />
    </div>
  )
}

export default AmountClaimedChart
