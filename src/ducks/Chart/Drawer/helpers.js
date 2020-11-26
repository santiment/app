import { drawBubble } from '@santiment-network/chart/tooltip/valueBubble'
import { valueByY } from '@santiment-network/chart/scales'
import { getTextWidth } from '@santiment-network/chart/utils'
import {
  clearCtx,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter,
  isDayInterval
} from '../utils'

const getLineFn = (x1, y1, x2, y2) => x =>
  y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)

const checkIsBetweenLines = (x, y, getLineY1, getLineY2) =>
  (getLineY1(x) > y) ^ (getLineY2(x) > y)

const ctx = {}

function lineToPlane ([[x1, y1], [x2, y2]]) {
  const width = 2

  const planeX1 = x1 + width
  const planeY1 = y1 + width
  const planeX2 = x1 - width
  const planeY2 = y1 - width

  const planeX3 = x2 + width
  const planeY3 = y2 + width
  const planeX4 = x2 - width
  const planeY4 = y2 - width

  return [
    [planeX1, planeY1, planeX2, planeY2],
    [planeX3, planeY3, planeX4, planeY4],
    [planeX1, planeY1, planeX3, planeY3],
    [planeX2, planeY2, planeX4, planeY4]
  ]
}

function checkIsPointOnPlane (x, y, line) {
  const plane = lineToPlane(line)

  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.moveTo(plane[0][0], plane[0][1])
  ctx.lineTo(plane[0][2], plane[0][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#c00'
  ctx.lineTo(plane[1][0], plane[1][1])
  ctx.lineTo(plane[1][2], plane[1][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#0c0'
  ctx.lineTo(plane[2][0], plane[2][1])
  ctx.lineTo(plane[2][2], plane[2][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#00c'
  ctx.lineTo(plane[3][0], plane[3][1])
  ctx.lineTo(plane[3][2], plane[3][3])
  ctx.stroke()

  return (
    checkIsBetweenLines(x, y, getLineFn(...plane[0]), getLineFn(...plane[1])) &&
    checkIsBetweenLines(x, y, getLineFn(...plane[2]), getLineFn(...plane[3]))
  )
}

export function getLineHandle (ctx, x, y) {
  const handle = new Path2D()

  ctx.strokeStyle = '#00c'
  ctx.lineWidth = 2
  ctx.fillStyle = '#fff'
  handle.arc(x, y, 6, 0, 2 * Math.PI)

  return handle
}

function movePoints (drawing, diffX, diffY) {
  const [[x1, y1], [x2, y2]] = drawing.absCoor

  drawing.absCoor[0][0] = x1 + diffX
  drawing.absCoor[0][1] = y1 + diffY
  drawing.absCoor[1][0] = x2 + diffX
  drawing.absCoor[1][1] = y2 + diffY
}

export const getAbsoluteY = (height, relY) => height * relY
export const getRelativeY = (height, absY) => absY / height

export function paintDrawings (chart) {
  const { ctx, drawings, mouseover, selected } = chart.drawer
  clearCtx(chart, ctx)

  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i]
    drawing.shape = new Path2D()

    const [[x1, y1], [x2, y2]] = drawing.absCoor || [[], []]
    const { shape, color, width = 3 } = drawing

    ctx.save()

    ctx.lineWidth = width
    ctx.strokeStyle = color

    shape.moveTo(x1, y1)
    shape.lineTo(x2, y2)
    ctx.stroke(shape)

    const handle1 = getLineHandle(ctx, x1, y1)
    const handle2 = getLineHandle(ctx, x2, y2)
    drawing.handles = [handle1, handle2]

    if (mouseover || selected) {
      ctx.fill(handle1)
      ctx.stroke(handle1)
      ctx.fill(handle2)
      ctx.stroke(handle2)
    }

    ctx.restore()
  }
}

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

export function paintDrawingAxes (chart) {
  const {
    drawer,
    bubblesPaintConfig,
    tooltipKey,
    minMaxes,
    data,
    width,
    right
  } = chart
  const { ctx, selected: drawing } = drawer
  if (!drawing) return

  const [[x1, y1], [x2, y2]] = drawing.absCoor || [[], []]

  const xBubbleFormatter = isDayInterval(chart)
    ? getDateHoursMinutes
    : getDateDayMonthYear

  const paintConfig = getBubblePaintConfig(bubblesPaintConfig)
  /* ctx.fillStyle = '#cccccc66' */
  /* ctx.fillRect(x1, bottom + 4, x2 - x1, 13) */

  const firstDatetime = data[0].datetime
  const lastDatetime = data[data.length - 1].datetime
  const factor = (lastDatetime - firstDatetime) / width
  const scaleDatetime = x => factor * x + firstDatetime

  const x1Date = scaleDatetime(x1)
  const x2Date = scaleDatetime(x2)

  const { min, max } = minMaxes[tooltipKey]
  const y1Value = valueByY(chart, y1, min, max)
  const y2Value = valueByY(chart, y2, min, max)

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
