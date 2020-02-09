import COLOR from '@santiment-network/ui/variables.scss'
import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes
} from './utils'
import { dayTicksPaintConfig, dayAxesColor } from './paintConfigs'

const yFormatter = value => (value < 1 ? +value.toFixed(2) : Math.trunc(value))

export function plotAxes (chart) {
  const {
    tooltipKey,
    ticksPaintConfig = dayTicksPaintConfig,
    axesColor = dayAxesColor
  } = chart

  drawAxes(chart, axesColor)
  drawAxesTicks(
    chart,
    chart.tooltipKey,
    isDayInterval(chart) ? getDateHoursMinutes : getDateDayMonthYear,
    yFormatter,
    ticksPaintConfig
  )
}
