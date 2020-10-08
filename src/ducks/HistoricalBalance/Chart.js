import React, { useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import SANChart from '../Chart'
import { useChartColors } from '../Chart/colors'
import { useClosestValueData, useAxesMetricsKey } from '../Chart/hooks'
import { useMetricCategories } from '../Chart/Synchronizer'
import { useTimeseries } from '../Studio/timeseries/hooks'
import styles from './Chart.module.scss'

import ChartTest from './Test'
import Lines from './Test/Lines'
import Axes from './Test/Axes'
import CartesianGrid from './Test/CartesianGrid'
import Tooltip from './Test/Tooltip'

const chartPadding = {
  top: 25,
  bottom: 25,
  right: 48,
  left: 15
}

const DOUBLE_AXIS_PADDING = {
  ...chartPadding,
  left: 48
}

function getResponsiveTicks (isPhone) {
  let xAxesTicks
  let yAxesTicks

  if (isPhone) {
    xAxesTicks = 4
    yAxesTicks = 6
  }

  return {
    xAxesTicks,
    yAxesTicks
  }
}

export const useResponsiveTicks = isPhone =>
  useMemo(() => getResponsiveTicks(isPhone), [isPhone])

const Chart = ({ metrics, settings, className, ...props }) => {
  const [rawData, loadings] = useTimeseries(metrics, settings)
  const data = useClosestValueData(rawData, metrics)
  const categories = useMetricCategories(metrics)
  const MetricColor = useChartColors(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)

  return (
    <>
      <div className={cx(styles.chart, className)}>
        <SANChart
          hideBrush
          hideWatermark
          isCartesianGridActive
          chartPadding={chartPadding}
          {...props}
          {...categories}
          className={styles.canvas}
          data={data}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          axesMetricKeys={axesMetricKeys}
        />

        {loadings.length > 0 && <Loader className={styles.loader} />}

        {metrics.length === 0 && (
          <div className={styles.description}>
            Please paste the wallet address and choose supported assets in the
            forms above to see the historical data
          </div>
        )}
      </div>
      <ChartTest
        height={450}
        data={data}
        categories={categories}
        colors={MetricColor}
        padding={axesMetricKeys[1] ? DOUBLE_AXIS_PADDING : chartPadding}
      >
        <Lines />
        <Axes metrics={axesMetricKeys} />
        <CartesianGrid />
        <Tooltip metric={axesMetricKeys[0]} />
      </ChartTest>
    </>
  )
}

export default Chart
