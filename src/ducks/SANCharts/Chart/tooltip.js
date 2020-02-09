import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubbleY,
  drawValueBubbleX
} from '@santiment-network/chart/tooltip'
import { handleMove } from '@santiment-network/chart/events'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from './utils'
import { dayTooltipPaintConfig, dayBubblesPaintConfig } from './paintConfigs'
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
    tooltipKey,
    hoverLineColor,
    tooltipPaintConfig,
    bubblesPaintConfig
  } = chart
  const metricPoint = point[tooltipKey]
  if (!metricPoint) return

  clearCtx(chart, ctx)

  const { x, value: datetime } = point
  const { y, value } = metricPoint

  drawHoverLineX(chart, x, hoverLineColor, 5)
  drawHoverLineY(chart, y, hoverLineColor, -20)

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  drawTooltip(ctx, point, tooltipSettings, marker, tooltipPaintConfig)
  drawValueBubbleY(chart, yBubbleFormatter(value), y, bubblesPaintConfig)
  drawValueBubbleX(chart, xBubbleFormatter(datetime), x, bubblesPaintConfig)
}
