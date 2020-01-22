import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../../utils/dates'
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
    return value.toString().slice(0, 3)
  }

  return millify(value)
}
