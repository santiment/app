import React, { useEffect } from 'react'
import { getTextWidth } from '@santiment-network/chart/utils'
import COLOR from '@santiment-network/ui/variables.scss'
import { useChart } from '../../Chart/context'
import { useTimeseries } from '../timeseries/hooks'
import { Metric } from '../../dataHub/metrics'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
import { ONE_DAY_IN_MS } from '../../../utils/dates'

const { price_usd } = Metric

const TIMESERIES_METRICS = [price_usd]
const DAY_INTERVAL = ONE_DAY_IN_MS * 2
const BOTTOM_MARGIN = 5
const RIGHT_MARGIN = 7

function drawLastDayPrice (chart, scale, price) {
  const { ctx, minMaxes, top, left, right, bottom } = chart
  if (!minMaxes) return

  const priceMinMaxes = minMaxes.price_usd
  if (!priceMinMaxes) return

  const { min, max } = priceMinMaxes

  const y = scale(chart, min, max)(price)

  if (y > bottom || y < top) return

  const text = `Last day price ${TooltipSetting.price_usd.formatter(price)}`

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

const LastDayPrice = ({ chart, scale, settings }) => {
  const [data] = useTimeseries(TIMESERIES_METRICS, settings)

  useEffect(
    () => {
      const first = data[0]

      if (!first) return

      drawLastDayPrice(chart, scale, first.price_usd)
    },
    [data, scale, chart.minMaxes]
  )

  return null
}

export default ({ metrics, settings, ...props }) => {
  const { from, to } = settings
  const chart = useChart()

  return chart &&
    metrics.includes(price_usd) &&
    new Date(to) - new Date(from) <= DAY_INTERVAL ? (
      <LastDayPrice chart={chart} {...props} settings={settings} />
    ) : null
}
