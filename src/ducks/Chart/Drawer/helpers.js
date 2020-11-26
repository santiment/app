import { linearScale, valueByY } from '@santiment-network/chart/scales'
import { drawBubble } from '@santiment-network/chart/tooltip/valueBubble'
import { getTextWidth } from '@santiment-network/chart/utils'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval,
  linearDatetimeScale
} from '../utils'

export const getAbsoluteY = (height, relY) => height * relY
export const getRelativeY = (height, absY) => absY / height
export const getPressedHandleType = (ctx, [handle1, handle2], x, y) =>
  ctx.isPointInPath(handle1, x, y)
    ? 1
    : ctx.isPointInPath(handle2, x, y)
      ? 2
      : 3

const getBubblePaintConfig = paintConfig =>
  Object.assign({}, paintConfig, {
    bgColor: '#9faac4'
  })

export function checkIsOnStrokeArea (ctx, shape, x, y) {
  if (ctx.isPointInStroke(shape, x, y)) return true

  for (let i = 1; i < 9; i++) {
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

export function absoluteToRelativeCoordinates (chart, drawing) {
  const { width, data, tooltipKey, minMaxes } = chart
  const { min, max } = minMaxes[tooltipKey]

  const [x1, y1, x2, y2] = drawing.absCoor

  const firstDatetime = data[0].datetime
  const lastDatetime = data[data.length - 1].datetime
  const factor = (lastDatetime - firstDatetime) / width
  const scaleDatetime = x => factor * x + firstDatetime

  return [
    Math.floor(scaleDatetime(x1)),
    valueByY(chart, y1, min, max),
    Math.floor(scaleDatetime(x2)),
    valueByY(chart, y2, min, max)
  ]
}

export function relativeToAbsoluteCoordinates (chart, drawing) {
  const { data, tooltipKey, minMaxes } = chart
  const { min, max } = minMaxes[tooltipKey]

  const [x1, y1, x2, y2] = drawing.relCoor

  const xScaler = linearDatetimeScale(chart, data)
  const yScaler = linearScale(chart, min, max)

  return [xScaler(x1), yScaler(y1), xScaler(x2), yScaler(y2)]
}

export function getLineHandle (ctx, x, y, bgColor, strokeColor) {
  const handle = new Path2D()

  ctx.lineWidth = 2
  ctx.strokeStyle = strokeColor
  ctx.fillStyle = bgColor
  handle.arc(x, y, 6, 0, 2 * Math.PI)

  return handle
}

export function paintDrawings (chart) {
  const { drawer, right, bottom, width, height } = chart
  const { ctx, drawings, mouseover, selected } = drawer
  clearCtx(chart, ctx)

  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i]
    if (!drawing.absCoor) continue

    drawing.shape = new Path2D()

    const [x1, y1, x2, y2] = drawing.absCoor
    const { shape, color, width = 2 } = drawing

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

  ctx.clearRect(width + 5, 0, 1000, bottom)
  ctx.clearRect(0, height + 10, right, 1000)
}

export function paintDrawingAxes (chart) {
  const { width, height, drawer, bubblesPaintConfig, tooltipKey } = chart
  const { ctx, selected: drawing } = drawer
  if (!drawing || !drawing.absCoor) return

  const [x1, y1, x2, y2] = drawing.absCoor

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  const paintConfig = getBubblePaintConfig(bubblesPaintConfig)

  const [x1Date, y1Value, x2Date, y2Value] = absoluteToRelativeCoordinates(
    chart,
    drawing
  )

  ctx.save()

  drawValueBubbleX(chart, xBubbleFormatter(x1Date), x1, paintConfig)
  drawValueBubbleX(chart, xBubbleFormatter(x2Date), x2, paintConfig)

  drawValueBubbleY(
    chart,
    yBubbleFormatter(y1Value, tooltipKey),
    y1,
    paintConfig
  )
  drawValueBubbleY(
    chart,
    yBubbleFormatter(y2Value, tooltipKey),
    y2,
    paintConfig
  )

  ctx.clearRect(width, height + 12, 200, 200)

  ctx.restore()
}

const BUBBLE_PADDING = 3
const BUBBLE_DOUBLE_PADDING = BUBBLE_PADDING + BUBBLE_PADDING

function drawValueBubbleX (chart, text, x, paintConfig, offsetY = 0) {
  const {
    drawer: { ctx },
    left,
    bottom
  } = chart

  const width = getBubbleWidth(ctx, text, paintConfig)
  const startY = bottom + 4 + offsetY
  const startX = x - width / 2

  const alignedX = startX < left ? left : startX

  drawBubble(ctx, text, alignedX, startY, width, paintConfig)
}

function getBubbleWidth (ctx, text, paintConfig): number {
  ctx.save()
  ctx.font = paintConfig.font
  return BUBBLE_DOUBLE_PADDING + getTextWidth(ctx, text)
}

const BUBBLE_HEIGHT = 13
const BUBBLE_HALF_HEIGHT = Math.round(BUBBLE_HEIGHT / 2)

export function drawValueBubbleY (chart, text, y, paintConfig, offsetX = 0) {
  const {
    drawer: { ctx },
    right
  } = chart

  const width = getBubbleWidth(ctx, text, paintConfig)
  const startY = y - BUBBLE_HALF_HEIGHT
  const startX = right + 3 + offsetX

  drawBubble(ctx, text, startX, startY, width, paintConfig)
}
