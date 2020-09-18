import React, { useState, useRef } from 'react'
import cx from 'classnames'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import { DATA as data } from './AmountClaimed/data'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { useMetricCategories } from '../../ducks/Chart/Synchronizer'
import Chart from '../../ducks/Chart'
import styles from './index.module.scss'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { FORMATTER } from '../../ducks/dataHub/tooltipSettings'

const TOTAL_CLAIMED_METRIC = {
  key: 'uniswap_total_claimed',
  label: 'Uniswap Total Claimed',
  node: 'line'
}

const settings = {
  slug: 'uniswap',
  interval: '1h',
  from: '2020-09-15T00:00:00Z',
  to: '2020-09-20T00:00:00Z'
}

const eventsData = []

const chartPadding = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8
}

function formatDate (datetime) {
  const date = new Date(datetime)
  const { HH, mm } = getTimeFormats(date)
  const { DD, MMM, YY } = getDateFormats(date)

  return `${HH}:${mm}, ${MMM} ${DD}, ${YY}`
}

const AmountClaimedChart = ({
  className,
  metrics,
  MetricColor,
  axesMetricKeys
}) => {
  /* const [data] = useTimeseries(metrics, settings) */
  const categories = useMetricCategories(metrics)
  const [hoveredPoint, setHoveredPoint] = useState(data[0])

  /* const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive) */
  /* const MetricColor = useChartColors(metrics) */

  function onHover (point) {
    if (!point) {
      return setHoveredPoint(data[data.length - 1])
    }

    setHoveredPoint({
      datetime: point.value,
      [TOTAL_CLAIMED_METRIC.key]: point[TOTAL_CLAIMED_METRIC.key].value
    })
  }

  return (
    <div className={cx(styles.widget, styles.chart)}>
      <div className={styles.chart__header}>
        <span>{FORMATTER(hoveredPoint[TOTAL_CLAIMED_METRIC.key])}</span>
        <span>{formatDate(hoveredPoint.datetime)}</span>
      </div>

      <Chart
        hideBrush
        hideAxes
        hideWatermark
        {...categories}
        {...settings}
        useCustomTooltip
        data={data}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={linearScale}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        chartPadding={chartPadding}
        chartHeight={250}
        resizeDependencies={[]}
        onPlotTooltip={onHover}
      />
    </div>
  )
}

export default AmountClaimedChart
