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
import { TooltipSetting } from '../dataHub/tooltipSettings'
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
    : (TooltipSetting[metricKey] && TooltipSetting[metricKey].axisFormatter) ||
      yFormatter

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
      scale,
      10,
      8
    )
  }

  if (secondaryAxisMetric && chart.minMaxes[secondaryAxisMetric]) {
    drawLeftAxis(chart, axesColor)
    drawLeftAxisTicks(
      chart,
      secondaryAxisMetric,
      selectYFormatter(secondaryAxisMetric),
      ticksPaintConfig,
      scale,
      8
    )
  }
}
