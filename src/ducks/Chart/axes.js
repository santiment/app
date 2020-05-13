import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes
} from './utils'
import { dayTicksPaintConfig, dayAxesColor } from './paintConfigs'
import { millify } from '../../utils/formatting'

const yFormatter = value => {
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

export function plotAxes (props) {
  const { chart, scale, xFormatter, xTicksAmount } = props
  const {
    tooltipKey,
    ticksPaintConfig = dayTicksPaintConfig,
    axesColor = dayAxesColor
  } = chart

  const xFormatterNew =
    xFormatter ||
    (isDayInterval(chart) ? getDateHoursMinutes : getDateDayMonthYear)

  drawAxes(chart, axesColor)
  drawAxesTicks(
    chart,
    tooltipKey,
    xFormatterNew,
    yFormatter,
    ticksPaintConfig,
    scale,
    xTicksAmount
  )
}
