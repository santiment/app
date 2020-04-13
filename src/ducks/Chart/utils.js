import { Metric } from '../dataHub/metrics'
import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../utils/dates'
import { millify } from '../../utils/formatting'

const DAY_INTERVAL = ONE_DAY_IN_MS * 2

export function isDayInterval (chart) {
  const { points } = chart
  const lastIndex = points.length - 1
  const firstDate = points[0].value
  const lastDate = points[lastIndex].value

  return lastDate - firstDate < DAY_INTERVAL
}

export function getValidTooltipKey (tooltipKey, joinedCategories) {
  return joinedCategories.includes(tooltipKey)
    ? tooltipKey
    : joinedCategories[0]
}

export function clearCtx (chart, ctx = chart.ctx) {
  const { canvasWidth, canvasHeight } = chart
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

export function getDateDayMonthYear (date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

export function getDateHoursMinutes (date) {
  const { HH, mm } = getTimeFormats(new Date(date))
  return `${HH}:${mm}`
}

export function yBubbleFormatter (value) {
  if (!value) {
    return '-'
  }

  if (value < 1) {
    return value.toString().slice(0, 5)
  }

  if (value < 100) {
    return millify(value, 3)
  }

  return millify(value)
}

export const findTooltipMetric = metrics =>
  (metrics.includes(Metric.price_usd) && Metric.price_usd) ||
  metrics.find(({ node }) => node === 'line') ||
  metrics[0]

export function findPointIndexByDate (points, target) {
  const lastIndex = points.length - 1
  const firstDate = points[0].value
  const lastDate = points[lastIndex].value

  const factor = lastIndex / (lastDate - firstDate)
  return Math.round((target - firstDate) * factor)
}
