import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubbleY,
  drawValueBubbleX
} from '@santiment-network/chart/tooltip'
import { handleMove, getHoveredIndex } from '@santiment-network/chart/events'
import { drawAlertPlus } from './alert'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from '../utils'
import { TooltipSetting } from '../../dataHub/tooltipSettings'

export function setupTooltip (chart, marker, useCustomTooltip, onPlotTooltip) {
  const {
    tooltip: { canvas, ctx }
  } = chart

  canvas.onmousemove = handleMove(chart, point => {
    if (!point) return
    chart.syncTooltips(point.value)
    if (useCustomTooltip) {
      onPlotTooltip(point)
      plotTooltip(chart, marker, point, {
        showLines: true,
        customTooltip: true,
        showAlertPlus: true
      })
    } else {
      plotTooltip(chart, marker, point)
    }
  })

  canvas.onmousedown = handleMove(chart, point => {
    if (!point) return
    const { left, right, points, pointWidth } = chart
    const {
      left: canvasPageLeft,
      right: canvasPageRight
    } = canvas.getBoundingClientRect()
    const { x } = point

    let moved = false

    if (chart.onRangeSelect) {
      window.addEventListener('mousemove', onMouseMove)

      if (chart.onRangeSelectStart) {
        chart.onRangeSelectStart(point)
      }
    }

    window.addEventListener('mouseup', onMouseUp)

    function onMouseMove ({ pageX }) {
      const { left, right, top, height } = chart

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
      const width = endPoint.x - x

      plotTooltip(chart, marker, endPoint)
      ctx.save()
      ctx.fillStyle = '#9faac435'
      ctx.fillRect(x, top, width, height)
      ctx.restore()
    }

    function onMouseUp ({ offsetX }) {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      const index = getHoveredIndex(offsetX - left, pointWidth, points.length)
      const endPoint = points[index < 0 ? 0 : index]

      if (moved) {
        clearCtx(chart, ctx)

        if (offsetX >= left && offsetX <= right) {
          plotTooltip(chart, marker, endPoint)
        }

        chart.onRangeSelect(point, endPoint)
      } else {
        chart.onPointClick(endPoint)
      }
    }
  })

  canvas.onmouseleave = () => {
    clearCtx(chart, ctx)
    chart.syncTooltips()
    if (onPlotTooltip) {
      onPlotTooltip(null)
    }
  }
}

const metricValueAccessor = ({ value }) => value || value === 0

export function plotTooltip (chart, marker, point, options) {
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

  const { x, value: datetime, ...metrics } = point
  const { y, value } = metricPoint

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  if (options && options.customTooltip) {
    if (options.showLines) {
      drawHoverLineX(chart, x, hoverLineColor, 0)
      drawHoverLineY(chart, y, hoverLineColor, -5)
    }

    if (options.showAlertPlus) {
      drawAlertPlus(chart, y)
    }
  } else {
    const drawnMetrics = Object.values(metrics).filter(metricValueAccessor)

    drawHoverLineX(chart, x, hoverLineColor, 5)
    drawHoverLineY(chart, y, hoverLineColor, 0, 20)

    drawAlertPlus(chart, y)

    if (drawnMetrics.length) {
      drawTooltip(ctx, point, TooltipSetting, marker, tooltipPaintConfig)
      drawValueBubbleY(
        chart,
        ctx,
        yBubbleFormatter(value, tooltipKey),
        y,
        bubblesPaintConfig,
        chart.isAlertsActive ? 5 : 0
      )
    }
    drawValueBubbleX(
      chart,
      ctx,
      xBubbleFormatter(datetime),
      x,
      bubblesPaintConfig
    )
  }
}
