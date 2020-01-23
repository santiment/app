import { Metrics } from '../data'
import { getDateFormats } from '../../../utils/dates'
import { millify } from '../../../utils/formatting'

export function clearCtx (chart, ctx = chart.ctx) {
  const { canvasWidth, canvasHeight } = chart
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

export function getDateDayMonthYear (date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

export function yBubbleFormatter (value) {
  if (!value) {
    return '-'
  }

  if (value < 1) {
    return value.toString().slice(0, 5)
  }

  return millify(value)
}

export const findTooltipMetric = metrics =>
  (metrics.includes(Metrics.historyPrice) && Metrics.historyPrice) ||
  metrics.find(({ node }) => node === 'line') ||
  metrics[0]

export function findPointIndexByDate (points, target) {
  const lastIndex = points.length - 1
  const firstDate = points[0].value
  const lastDate = points[lastIndex].value

  const factor = lastIndex / (lastDate - firstDate)
  return Math.round((target - firstDate) * factor)
}
