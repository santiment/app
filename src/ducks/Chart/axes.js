import {
  drawAxes,
  drawAxesTicks,
  drawLeftAxis,
  drawLeftAxisTicks
} from '@santiment-network/chart/axes'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes
} from './utils'
import { dayTicksPaintConfig, dayAxesColor } from './paintConfigs'
import { Metric } from '../dataHub/metrics'
import { mirroredMetrics } from '../dataHub/metrics/mirrored'
import { millify } from '../../utils/formatting'

function yFormatter (value) {
  const absValue = Math.abs(value)

  if (!value) {
    return 0
  }

  if (absValue < 1) {
    return +value.toFixed(3)
  }

  if (absValue < 100) {
    return millify(value, 3)
  }

  if (absValue > 999999) {
    return millify(value, 2)
  }

  if (absValue > 99999) {
    return millify(value, 0)
  }

  if (absValue > 9999) {
    return millify(value, 1)
  }

  return Math.trunc(value)
}

const selectYFormatter = metricKey =>
  mirroredMetrics.includes(metricKey)
    ? value => yFormatter(Math.abs(value))
    : metricKey === Metric.mvrv_long_short_diff_usd.key
      ? v => `${Math.trunc(v * 100)}%`
      : yFormatter

export function plotAxes (chart, scale) {
  const {
    axesMetricKeys,
    ticksPaintConfig = dayTicksPaintConfig,
    axesColor = dayAxesColor
  } = chart

  const [mainAxisMetric, secondaryAxisMetric] = axesMetricKeys

  drawAxes(chart, axesColor)

  if (chart.minMaxes[mainAxisMetric]) {
    drawAxesTicks(
      chart,
      mainAxisMetric,
      isDayInterval(chart) ? getDateHoursMinutes : getDateDayMonthYear,
      selectYFormatter(mainAxisMetric),
      ticksPaintConfig,
      scale
    )
  }

  if (secondaryAxisMetric && chart.minMaxes[secondaryAxisMetric]) {
    drawLeftAxis(chart, axesColor)
    drawLeftAxisTicks(
      chart,
      secondaryAxisMetric,
      selectYFormatter(secondaryAxisMetric),
      ticksPaintConfig,
      scale
    )
  }
}
