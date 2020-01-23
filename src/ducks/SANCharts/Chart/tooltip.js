import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubble
} from '@santiment-network/chart/tooltip'
import { handleMove } from '@santiment-network/chart/events'
import { tooltipSettings, BRUSH_HEIGHT, CHART_PADDING } from './settings'
import {
  clearCtx,
  axesTickFormatters,
  getDateDayMonthYear,
  yBubbleFormatter
} from './utils'

export function setupTooltip (chart, marker, syncTooltips, onPointHover) {
  const {
    tooltip: { canvas, ctx }
  } = chart

  canvas.onmousemove = handleMove(chart, point => {
    if (!point) return
    syncTooltips(point.value)
    plotTooltip(chart, marker, point)
    onPointHover(point)
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

  drawHoverLineX(chart, x)
  drawHoverLineY(chart, y)

  drawTooltip(ctx, point, tooltipSettings, marker)
  drawValueBubble(chart, yBubbleFormatter(value), 0, y)
  drawValueBubble(chart, getDateDayMonthYear(datetime), x, chart.bottom + 14)
}
