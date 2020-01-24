import COLOR from '@santiment-network/ui/variables.scss'
import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import { getDateDayMonthYear } from './utils'

const axesTickFormatters = {
  datetime: getDateDayMonthYear
}

export function plotAxes (chart) {
  const { ctx, tooltipKey } = chart
  drawAxes(chart)
  ctx.fillStyle = COLOR.casper
  ctx.font = '12px sans-serif'
  drawAxesTicks(chart, tooltipKey, axesTickFormatters)
}
