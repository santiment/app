import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubbleY,
  drawValueBubbleX
} from '@santiment-network/chart/tooltip'
import {
  handleMove as handlePointEvent,
  getHoveredIndex
} from '@santiment-network/chart/events'
import {
  logScale,
  valueByY,
  valueByLogY
} from '@santiment-network/chart/scales'
import { drawAlertPlus } from './alert'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from '../utils'
import { CursorType } from '../cursor'
import { TooltipSetting } from '../../dataHub/tooltipSettings'

const metricValueAccessor = ({ value }) => value || value === 0

export function setupTooltip (chart, marker) {
  const { canvas, ctx } = chart.tooltip

  canvas.onmousemove = handlePointEvent(chart, (point, e) => {
    if (!point) return

    chart.syncTooltips(point.value)
    plotTooltip(chart, marker, point, e)
  })

  canvas.onmousedown = handlePointEvent(chart, point => {
    if (!point) return

    if (chart.isDrawing) return

    const { left, right, points, pointWidth } = chart
    const {
      left: canvasPageLeft,
      right: canvasPageRight
    } = canvas.getBoundingClientRect()
    const { x } = point

    let moved = false

    window.addEventListener('mouseup', onMouseUp)
    chart.onPointMouseDown(point)

    if (chart.onRangeSelected) {
      window.addEventListener('mousemove', onMouseMove)
    }

    function onMouseMove ({ pageX }) {
      if (chart.isDrawing) {
        return window.removeEventListener('mousemove', onMouseMove)
      }

      const isOutOfLeft = pageX < canvasPageLeft
      const isOutOfRight = pageX > canvasPageRight
      const relativeX = isOutOfLeft
        ? left
        : isOutOfRight
          ? right
          : pageX - canvasPageLeft

      moved = true

      const index = getHoveredIndex(relativeX - left, pointWidth, points.length)
      const endPoint = points[index < 0 ? 0 : index]

      plotTooltip(chart, marker, endPoint)
      plotRangeSelection(chart, x, endPoint.x - x)

      if (chart.onRangeSelecting) {
        chart.onRangeSelecting(endPoint)
      }
    }

    function onMouseUp ({ offsetX }) {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      const index = getHoveredIndex(offsetX - left, pointWidth, points.length)
      const endPoint = points[index < 0 ? 0 : index]

      chart.onPointMouseUp(endPoint)

      if (moved) {
        clearCtx(chart, ctx)

        if (offsetX >= left && offsetX <= right) {
          plotTooltip(chart, marker, endPoint)
        }

        chart.onRangeSelected(point, endPoint)
      }
    }
  })

  canvas.onmouseleave = () => {
    clearCtx(chart, ctx)
    chart.syncTooltips()
  }
}

export function plotTooltip (chart, marker, point, event) {
  const {
    tooltip: { ctx },
    cursorType,
    tooltipKey,
    hoverLineColor,
    tooltipPaintConfig,
    bubblesPaintConfig
  } = chart
  const metricPoint = point[tooltipKey]
  if (!metricPoint) return

  clearCtx(chart, ctx)

  const resultCursorType = event && event.altKey ? +!cursorType : cursorType
  const { x, value: datetime, ...metrics } = point
  let { y, value } = metricPoint

  if (event && Number.isFinite(y) && resultCursorType === CursorType.FREE) {
    const { offsetY } = event
    const { top, bottom, minMaxes, scale } = chart
    const { min, max } = minMaxes[tooltipKey]

    y = offsetY < top ? top : offsetY > bottom ? bottom : offsetY
    value = (scale === logScale ? valueByLogY : valueByY)(chart, y, min, max)
  }

  const drawnMetrics = Object.values(metrics).filter(metricValueAccessor)
  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  drawHoverLineX(chart, x, hoverLineColor, 5)
  drawHoverLineY(chart, y, hoverLineColor, 0, 20)

  drawAlertPlus(chart, y)

  if (drawnMetrics.length) {
    drawTooltip(ctx, point, TooltipSetting, marker, tooltipPaintConfig)
    drawValueBubbleY(
      chart,
      yBubbleFormatter(value, tooltipKey),
      y,
      bubblesPaintConfig,
      chart.isAlertsActive ? 5 : 0
    )
  }
  drawValueBubbleX(chart, xBubbleFormatter(datetime), x, bubblesPaintConfig)
}

function plotRangeSelection (chart, left, width) {
  const { tooltip, top, height } = chart
  const { ctx } = tooltip

  ctx.save()
  ctx.fillStyle = '#9faac435'
  ctx.fillRect(left, top, width, height)
  ctx.restore()
}
