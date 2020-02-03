import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubble
} from '@santiment-network/chart/tooltip'
import { handleMove } from '@santiment-network/chart/events'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from './utils'
import { tooltipSettings } from '../data'

export function setupTooltip (chart, marker, syncTooltips) {
  const {
    tooltip: { canvas, ctx }
  } = chart

  canvas.onmousemove = handleMove(chart, point => {
    if (!point) return
    syncTooltips(point.value)
    plotTooltip(chart, marker, point)
    chart.onPointHover(point)
  })
  canvas.onmouseleave = () => {
    clearCtx(chart, ctx)
    syncTooltips(null)
  }
}

export function plotTooltip (chart, marker, point) {
  const {
    tooltip: { ctx },
    tooltipKey
  } = chart
  clearCtx(chart, ctx)

  const { x, value: datetime } = point
  const { y, value } = point[tooltipKey]

  drawHoverLineX(chart, x, 5)
  drawHoverLineY(chart, y, -20)

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  drawTooltip(ctx, point, tooltipSettings, marker)
  drawValueBubble(chart, yBubbleFormatter(value), 0, y)
  drawValueBubble(chart, xBubbleFormatter(datetime), x, chart.bottom + 14)
}
