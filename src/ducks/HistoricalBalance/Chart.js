import React, { useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import SANChart from '../Chart/Modular'
import Lines from '../Chart/Lines'
import Areas from '../Chart/Areas'
import Axes from '../Chart/Axes'
import CartesianGrid from '../Chart/CartesianGrid'
import Tooltip from '../Chart/Tooltip'
import { useChartColors } from '../Chart/colors'
import { useClosestValueData, useAxesMetricsKey } from '../Chart/hooks'
import { useMetricCategories } from '../Chart/Synchronizer'
import { useTimeseries } from '../Studio/timeseries/hooks'
import styles from './Chart.module.scss'

const CHART_PADDING = {
  top: 25,
  bottom: 25,
  right: 48,
  left: 15
}

const DOUBLE_AXIS_PADDING = {
  ...CHART_PADDING,
  left: 48
}

function getResponsiveTicks (isPhone) {
  let xTicks
  let yTicks

  if (isPhone) {
    xTicks = 4
    yTicks = 6
  }

  return {
    xTicks,
    yTicks
  }
}

export const useResponsiveTicks = isPhone =>
  useMemo(() => getResponsiveTicks(isPhone), [isPhone])

const Chart = ({ metrics, settings, axesTicks, className, ...props }) => {
  const [rawData, loadings] = useTimeseries(metrics, settings)
  const data = useClosestValueData(rawData, metrics)
  const categories = useMetricCategories(metrics)
  const MetricColor = useChartColors(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)

  return (
    <div className={cx(styles.chart, className)}>
      <SANChart
        className={styles.canvas}
        padding={axesMetricKeys[1] ? DOUBLE_AXIS_PADDING : CHART_PADDING}
        {...props}
        data={data}
        categories={categories}
        colors={MetricColor}
      >
        <Areas />
        <Lines />
        <CartesianGrid {...axesTicks} />
        <Axes metrics={axesMetricKeys} {...axesTicks} />
        <Tooltip metric={axesMetricKeys[0]} />
      </SANChart>

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
