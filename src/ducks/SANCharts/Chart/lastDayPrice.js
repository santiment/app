import { graphql } from 'react-apollo'
import { getTextWidth } from '@santiment-network/chart/utils'
import COLOR from '@santiment-network/ui/variables.scss'
import { Metrics, tooltipSettings } from '../data'
import { ONE_DAY_IN_MS } from '../../../utils/dates'
import { GET_METRIC } from '../../GetTimeSeries/queries/get_metric'

const BOTTOM_MARGIN = 5
const RIGHT_MARGIN = 7

export function drawLastDayPrice (chart, scale, price) {
  const { ctx, minMaxes, top, left, right, bottom } = chart
  const priceMinMaxes = minMaxes.price_usd
  if (!priceMinMaxes) return

  const { min, max } = priceMinMaxes

  const y = scale(chart, min, max)(price)

  if (y > bottom || y < top) return

  const text = `Last day price ${tooltipSettings.price_usd.formatter(price)}`

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

const DAY_INTERVAL = ONE_DAY_IN_MS * 2

export const withLastDayPrice = graphql(GET_METRIC('price_usd'), {
  skip: ({ metrics, from, to }) => {
    return (
      !metrics.includes(Metrics.price_usd) ||
      new Date(to) - new Date(from) > DAY_INTERVAL
    )
  },
  props: ({ data: { getMetric: { timeseriesData = [] } = {} } }) => {
    const point = timeseriesData[0] || {}
    return { lastDayPrice: point.price_usd }
  },
  options: ({ slug, from }) => {
    const newFrom = new Date(from)
    newFrom.setHours(0, 0, 0, 0)

    const to = new Date(newFrom)
    to.setHours(1)

    return {
      variables: {
        from: newFrom.toISOString(),
        to: to.toISOString(),
        interval: '1d',
        slug
      }
    }
  }
})
