import {
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubbleY,
  drawValueBubbleX
} from '@santiment-network/chart/tooltip'
import { handleMove, getHoveredIndex } from '@santiment-network/chart/events'
import { waterloo } from '@santiment-network/ui/variables.scss'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from './utils'
import { TooltipSetting } from '../dataHub/tooltipSettings'

const ALERT_ADD_SIZE = 13
const ALERT_ADD_HALF_SIZE = 7

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

const metricValueAccessor = ({ value }) => value

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
        yBubbleFormatter(value, tooltipKey),
        y,
        bubblesPaintConfig,
        chart.isAlertsActive ? 5 : 0
      )
    }
    drawValueBubbleX(chart, xBubbleFormatter(datetime), x, bubblesPaintConfig)
  }
}

function drawAlertPlus (chart, y) {
  if (!chart.isAlertsActive) return

  const {
    tooltip: { ctx },
    right
  } = chart

  ctx.save()

  ctx.fillStyle = waterloo
  ctx.fillRect(
    right - ALERT_ADD_HALF_SIZE,
    y - ALERT_ADD_HALF_SIZE,
    ALERT_ADD_SIZE,
    ALERT_ADD_SIZE
  )

  const path = new Path2D(
    'M3.27 7a.33.33 0 01-.23-.08.33.33 0 01-.07-.22V3.97H.3a.33.33 0 01-.22-.08.33.33 0 01-.08-.22v-.42c0-.09.03-.16.08-.2a.3.3 0 01.22-.1h2.67V.3c0-.09.02-.16.07-.2a.3.3 0 01.23-.1h.45c.09 0 .16.03.2.1.07.04.1.11.1.2v2.65H6.7c.09 0 .16.03.2.1.07.04.1.11.1.2v.42a.3.3 0 01-.1.22.28.28 0 01-.2.08H4.02V6.7a.3.3 0 01-.1.22.28.28 0 01-.2.08h-.45z'
  )

  ctx.translate(right - 4, y - 4)
  ctx.fillStyle = 'white'
  ctx.fill(path)
  ctx.restore()
}
