import {
  linearScale,
  logScale,
  valueByY,
  valueByLogY
} from '@santiment-network/chart/scales'
import {
  drawValueBubbleY,
  drawValueBubbleX
} from '@santiment-network/chart/tooltip'
import COLOR from '@santiment-network/ui/variables.scss'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval,
  linearDatetimeScale
} from '../utils'
import { dayBubblesPaintConfig, nightBubblesPaintConfig } from '../paintConfigs'

const LINE_WIDTH = 2
export const HandleType = {
  LEFT: 1,
  RIGHT: 2,
  MOVE: 3
}

const DAY_PAINT_CONFIG = Object.assign({}, dayBubblesPaintConfig, {
  bgColor: COLOR.casper
})
const NIGHT_PAINT_CONFIG = Object.assign({}, nightBubblesPaintConfig, {
  bgColor: COLOR['cloud-burst']
})

export const newLine = (x, y) => ({
  color: COLOR['bali-hai'],
  absCoor: [x, y, x, y]
})

export const getPressedHandleType = (ctx, [handle1, handle2], x, y) =>
  ctx.isPointInPath(handle1, x, y)
    ? HandleType.LEFT
    : ctx.isPointInPath(handle2, x, y)
      ? HandleType.RIGHT
      : HandleType.MOVE

export function getLineHandle (ctx, x, y, bgColor, strokeColor) {
  const handle = new Path2D()

  ctx.lineWidth = LINE_WIDTH
  ctx.strokeStyle = strokeColor
  ctx.fillStyle = bgColor
  handle.arc(x, y, 6, 0, 2 * Math.PI)

  return handle
}

export function checkIsOnStrokeArea (ctx, shape, x, y) {
  if (ctx.isPointInStroke(shape, x, y)) return true

  for (let i = 1; i < 8; i++) {
    if (
      ctx.isPointInStroke(shape, x - i, y - i) ||
      ctx.isPointInStroke(shape, x - i, y + i) ||
      ctx.isPointInStroke(shape, x + i, y - i) ||
      ctx.isPointInStroke(shape, x + i, y + i)
    ) {
      return true
    }
  }

  return false
}

function datetimeRelativeScaler (data, width) {
  const firstDatetime = data[0].datetime
  const lastDatetime = data[data.length - 1].datetime
  const factor = (lastDatetime - firstDatetime) / width

  return x => factor * x + firstDatetime
}

export function absoluteToRelativeCoordinates (chart, drawing) {
  const { width, data, tooltipKey, minMaxes, scale } = chart
  const { min, max } = minMaxes[tooltipKey]

  const [x1, y1, x2, y2] = drawing.absCoor

  const scaleDatetime = datetimeRelativeScaler(data, width)
  const scaleValue = scale === logScale ? valueByLogY : valueByY

  return [
    Math.floor(scaleDatetime(x1)),
    scaleValue(chart, y1, min, max),
    Math.floor(scaleDatetime(x2)),
    scaleValue(chart, y2, min, max)
  ]
}

export function relativeToAbsoluteCoordinates (chart, drawing) {
  const { data, tooltipKey, minMaxes } = chart
  const { min, max } = minMaxes[tooltipKey]

  const [x1, y1, x2, y2] = drawing.relCoor

  const scaleX = linearDatetimeScale(chart, data)
  const scaleY = linearScale(chart, min, max)

  return [scaleX(x1), scaleY(y1), scaleX(x2), scaleY(y2)]
}

export function paintDrawings (chart) {
  const { drawer, right, bottom, left } = chart
  const { ctx, drawings, mouseover, selected } = drawer

  clearCtx(chart, ctx)

  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i]
    if (!drawing.absCoor) continue

    drawing.shape = new Path2D()

    const [x1, y1, x2, y2] = drawing.absCoor
    const { shape, color, width = LINE_WIDTH } = drawing

    ctx.save()

    ctx.lineWidth = width
    ctx.strokeStyle = color

    shape.moveTo(x1, y1)
    shape.lineTo(x2, y2)
    ctx.stroke(shape)

    const handle1 = getLineHandle(ctx, x1, y1, chart.bgColor, color)
    const handle2 = getLineHandle(ctx, x2, y2, chart.bgColor, color)
    drawing.handles = [handle1, handle2]

    if (drawing === mouseover || drawing === selected) {
      ctx.fill(handle1)
      ctx.stroke(handle1)
      ctx.fill(handle2)
      ctx.stroke(handle2)
    }

    ctx.restore()
  }

  ctx.clearRect(left, 0, -200, bottom)
  ctx.clearRect(right, 0, 200, bottom)
  ctx.clearRect(0, bottom, right, 200)
}

export function paintDrawingAxes (chart) {
  const { drawer, bubblesPaintConfig, tooltipKey, right, bottom } = chart
  const { ctx, selected: drawing } = drawer
  if (!drawing || !drawing.absCoor) return

  const [x1, y1, x2, y2] = drawing.absCoor

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  const paintConfig =
    bubblesPaintConfig === nightBubblesPaintConfig
      ? NIGHT_PAINT_CONFIG
      : DAY_PAINT_CONFIG

  const [x1Date, y1Value, x2Date, y2Value] = absoluteToRelativeCoordinates(
    chart,
    drawing
  )
  const formattedY1Value = yBubbleFormatter(y1Value, tooltipKey)
  const formattedY2Value = yBubbleFormatter(y2Value, tooltipKey)

  ctx.save()

  drawValueBubbleX(chart, ctx, xBubbleFormatter(x1Date), x1, paintConfig)
  drawValueBubbleX(chart, ctx, xBubbleFormatter(x2Date), x2, paintConfig)

  drawValueBubbleY(chart, ctx, formattedY1Value, y1, paintConfig)
  drawValueBubbleY(chart, ctx, formattedY2Value, y2, paintConfig)

  ctx.clearRect(right, bottom, 200, 200)

  ctx.restore()
}
