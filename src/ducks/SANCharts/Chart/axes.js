import COLOR from '@santiment-network/ui/variables.scss'
import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes
} from './utils'

const axesTickFormatters = {
  datetime: getDateDayMonthYear
}

const axesDayIntervalTickFormatters = {
  datetime: getDateHoursMinutes
}

export function plotAxes (chart) {
  const { ctx, tooltipKey } = chart
  drawAxes(chart)
  ctx.fillStyle = COLOR.casper
  ctx.font = '12px sans-serif'
  drawAxesTicks(
    chart,
    tooltipKey,
    isDayInterval(chart) ? axesDayIntervalTickFormatters : axesTickFormatters
  )
}
