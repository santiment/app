import COLOR from '@santiment-network/ui/variables.scss'
import { getTextWidth } from '@santiment-network/chart/utils'
import { linearScale } from '@santiment-network/chart/scales'
import { clearCtx } from '../utils'

const HEIGHT = 22

const MARGIN_BOTTOM = 5
const BUBBLE_MARGIN_BOTTOM = HEIGHT + MARGIN_BOTTOM

const PADDING_LEFT = 8
const PADDINGS = PADDING_LEFT * 2

const MARGIN_LEFT = 5
const TEXT_LEFT_MARGIN = MARGIN_LEFT + PADDING_LEFT

export function alignY (y) {
  return y > BUBBLE_MARGIN_BOTTOM ? y : y + BUBBLE_MARGIN_BOTTOM + MARGIN_BOTTOM
}

export function drawTextBubble (chart, y, width) {
  const {
    left,
    tooltip: { ctx }
  } = chart

  ctx.fillStyle = COLOR.rhino
  ctx.fillRect(
    left + MARGIN_LEFT,
    y - BUBBLE_MARGIN_BOTTOM,
    width + PADDINGS,
    HEIGHT
  )
}

export function drawTexts (ctx, texts, x, y) {
  let textX = x + TEXT_LEFT_MARGIN
  const textY = y - 12

  texts.forEach((text, i) => {
    ctx.fillStyle = i % 2 === 0 ? COLOR.casper : '#fff'
    ctx.fillText(text, textX, textY)
    textX += getTextWidth(ctx, text)
  })
}

export function drawLine (ctx, startX, endX, y) {
  ctx.strokeStyle = COLOR.rhino
  ctx.setLineDash([3])
  ctx.lineWidth = 2

  ctx.moveTo(startX, y)
  ctx.lineTo(endX, y)
  ctx.stroke()
}

export function findPriceByY (chart, y) {
  const { minMaxes, height, top } = chart
  const { min, max } = chart.minMaxes.priceUsd

  const factor = (max - min) / height

  return factor * (height - (y - top)) + min
}

export function drawHoveredSignal (chart, y, texts) {
  const {
    left,
    right,
    tooltip: { ctx }
  } = chart

  ctx.save()

  ctx.beginPath()
  clearCtx(chart, ctx)
  ctx.font = '12px Rubik'

  const alignedY = alignY(y)

  drawLine(ctx, left, right, y)
  drawTextBubble(chart, alignedY, getTextWidth(ctx, texts.join('')))
  drawTexts(ctx, texts, left, alignedY)

  ctx.restore()
}

export function makeSignalDrawable (
  { id, settings: { operation } },
  chart,
  scale
) {
  const { height, top, minMaxes } = chart
  if (!minMaxes) {
    return
  }

  const { min, max } = minMaxes.priceUsd
  const { below, above } = operation

  const type = below ? 'BELOW' : 'ABOVE'
  const value = below || above

  return {
    id,
    type,
    value,
    y: scale(height, min, max)(value) + top
  }
}
