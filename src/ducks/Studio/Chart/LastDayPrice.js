import { useEffect } from 'react'
import { getTextWidth } from '@santiment-network/chart/utils'
import COLOR from '@santiment-network/ui/variables.scss'
import { useChart, noop } from '../../Chart/context'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
import { ONE_DAY_IN_MS } from '../../../utils/dates'

const DAY_INTERVAL = ONE_DAY_IN_MS * 2
const BOTTOM_MARGIN = 5
const RIGHT_MARGIN = 7

function drawLastDayPrice (chart, price) {
  const { ctx, minMaxes, top, left, right, bottom, scale } = chart
  const priceMinMaxes = minMaxes.price_usd

  if (!priceMinMaxes) return

  const { min, max } = priceMinMaxes
  const y = scale(chart, min, max)(price)

  if (y > bottom || y < top) return

  const text = `Last day price ${TooltipSetting.price_usd.formatter(
    price.open || price
  )}`

  ctx.save()
  ctx.beginPath()

  ctx.lineWidth = 1
  ctx.strokeStyle = COLOR['jungle-green-hover']
  ctx.setLineDash([7])

  ctx.moveTo(left, y)
  ctx.lineTo(right - 2, y)
  ctx.stroke()

  ctx.fillStyle = COLOR.casper
  ctx.fillText(
    text,
    right - getTextWidth(ctx, text) - RIGHT_MARGIN,
    y - BOTTOM_MARGIN
  )

  ctx.restore()
}

function getLastDayPrice (firstPoint, from, to) {
  const price = firstPoint && firstPoint.price_usd
  return price && new Date(to) - new Date(from) <= DAY_INTERVAL && price
}

const LastDayPrice = ({ data, from, to }) => {
  const chart = useChart()

  useEffect(
    () => {
      const lastDayPrice = getLastDayPrice(data[0], from, to)

      chart.plotter.register(
        'lastDayPrice',
        lastDayPrice ? () => drawLastDayPrice(chart, lastDayPrice) : noop
      )
    },
    [data, from, to]
  )

  return null
}

export default LastDayPrice
