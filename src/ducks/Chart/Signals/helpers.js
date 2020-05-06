import COLOR from '@santiment-network/ui/variables.scss'
import { getTextWidth } from '@santiment-network/chart/utils'
import { clearCtx } from '../utils'
import { Metric } from '../../dataHub/metrics'
import { dailyActiveAddressesSuggesters } from '../../Studio/Alerts/suggestions/dailyActiveAddresses'

export const SIGNAL_BELOW = 'BELOW'
export const SIGNAL_ABOVE = 'ABOVE'

const HEIGHT = 22

const MARGIN_BOTTOM = 5
const BUBBLE_MARGIN_BOTTOM = HEIGHT + MARGIN_BOTTOM

const PADDING_LEFT = 8
const PADDINGS = PADDING_LEFT * 2

const MARGIN_LEFT = 11
const TEXT_LEFT_MARGIN = MARGIN_LEFT + PADDING_LEFT

function alignY (y) {
  return y > BUBBLE_MARGIN_BOTTOM ? y : y + BUBBLE_MARGIN_BOTTOM + MARGIN_BOTTOM
}

function drawTextBubble (chart, y, width) {
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

function drawTexts (ctx, texts, x, y) {
  let textX = x + TEXT_LEFT_MARGIN
  const textY = y - 12

  texts.forEach((text, i) => {
    ctx.fillStyle = i % 2 === 0 ? COLOR.casper : '#fff'
    ctx.fillText(text, textX, textY)
    textX += getTextWidth(ctx, text)
  })
}

function drawLine (ctx, startX, endX, y) {
  ctx.strokeStyle = COLOR.rhino
  ctx.setLineDash([3])
  ctx.lineWidth = 2

  ctx.moveTo(startX, y)
  ctx.lineTo(endX, y)
  ctx.stroke()
}

export function findMetricValueByY (chart, { key }, y) {
  const { minMaxes, height, top } = chart

  if (!minMaxes) {
    return
  }

  const { min, max } = minMaxes[key]

  const factor = (max - min) / height

  return factor * (height - (y - top)) + min
}

export function findMetricLastValue (data, { key }) {
  for (let i = data.length - 1; i > -1; i--) {
    const value = data[i][key]

    if (value) {
      return value
    }
  }
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
  ctx.font = '12px "Proxima Nova"'

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
  const { minMaxes } = chart
  if (!minMaxes || !minMaxes.price_usd) {
    return
  }

  const { min, max } = minMaxes.price_usd
  const { below, above } = operation

  const value = below || above

  if (value > max || value < min) {
    return
  }

  return {
    id,
    value,
    type: below ? SIGNAL_BELOW : SIGNAL_ABOVE,
    y: scale(chart, min, max)(value)
  }
}

export const checkPriceMetric = metric => metric === Metric.price_usd

export const AlertBuilder = {
  daily_active_addresses: () => {
    return dailyActiveAddressesSuggesters[0]
  }
}
