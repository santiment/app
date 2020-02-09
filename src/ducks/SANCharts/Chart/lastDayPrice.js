import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getTextWidth } from '@santiment-network/chart/utils'
import COLOR from '@santiment-network/ui/variables.scss'
import { Metrics, tooltipSettings } from '../data'
import { ONE_DAY_IN_MS } from '../../../utils/dates'

const BOTTOM_MARGIN = 5
const RIGHT_MARGIN = 7

export function drawLastDayPrice (chart, scale, price) {
  const { ctx, minMaxes, height, top, left, right, bottom } = chart
  const { min, max } = minMaxes.priceUsd

  const y = scale(height, min, max)(price) + top

  if (y > bottom || y < top) return

  const text = `Last day price ${tooltipSettings.priceUsd.formatter(price)}`

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

const HISTORY_PRICE_QUERY = gql`
  query historyPrice($slug: String, $from: DateTime, $to: DateTime) {
    historyPrice(slug: $slug, from: $from, to: $to, interval: "1d") {
      priceUsd
      datetime
    }
  }
`

const DAY_INTERVAL = ONE_DAY_IN_MS * 2

export const withLastDayPrice = graphql(HISTORY_PRICE_QUERY, {
  skip: ({ metrics, from, to }) => {
    return (
      !metrics.includes(Metrics.historyPrice) ||
      new Date(to) - new Date(from) > DAY_INTERVAL
    )
  },
  props: ({ data: { historyPrice = [] } }) => {
    const point = historyPrice[0] || {}
    return { lastDayPrice: point.priceUsd }
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
        slug
      }
    }
  }
})
