import {
  drawAxes,
  drawAxesTicks,
  drawLeftAxis,
  drawLeftAxisTicks,
} from '@santiment-network/chart/axes'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes,
} from './utils'
import { dayTicksPaintConfig, dayAxesColor } from './paintConfigs'
import { millify } from '../../utils/formatting'

const yFormatter = (value) => {
  if (!value) {
    return 0
  }

  if (value < 1) {
    return +value.toFixed(3)
  }

  if (value < 100) {
    return millify(value, 3)
  }

  if (value > 999999) {
    return millify(value, 2)
  }

  if (value > 9999) {
    return millify(value, 0)
  }

  return Math.trunc(value)
}

export function plotAxes(chart, scale) {
  const {
    axesMetricKeys,
    ticksPaintConfig = dayTicksPaintConfig,
    axesColor = dayAxesColor,
  } = chart

  const [mainAxisMetric, secondaryAxisMetric] = axesMetricKeys

  drawAxes(chart, axesColor)

  if (chart.minMaxes[mainAxisMetric]) {
    drawAxesTicks(
      chart,
      mainAxisMetric,
      isDayInterval(chart) ? getDateHoursMinutes : getDateDayMonthYear,
      yFormatter,
      ticksPaintConfig,
      scale,
    )
  }

  if (secondaryAxisMetric && chart.minMaxes[secondaryAxisMetric]) {
    drawLeftAxis(chart, axesColor)
    drawLeftAxisTicks(
      chart,
      secondaryAxisMetric,
      yFormatter,
      ticksPaintConfig,
      scale,
    )
  }
}
