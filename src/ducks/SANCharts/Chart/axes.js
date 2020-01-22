import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import { getDateDayMonthYear } from './utils'

const axesTickFormatters = {
  datetime: getDateDayMonthYear
}

export function plotAxes (chart) {
  const { ctx, tooltipKey } = chart
  drawAxes(chart)
  ctx.fillStyle = '#9faac4'
  ctx.font = '12px sans-serif'
  drawAxesTicks(chart, tooltipKey, axesTickFormatters)
}
