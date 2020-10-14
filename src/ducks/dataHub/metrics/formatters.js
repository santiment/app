import { formatNumber, millify } from '../../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'

const currencyFormatter = (val, currency) =>
  val || val === 0 ? formatNumber(val, { currency }) : 'No data'

export const usdFormatter = val => currencyFormatter(val, 'USD')

export const btcFormatter = val => currencyFormatter(val, 'BTC')

export const ethFormatter = val => currencyFormatter(val, 'ETH')

export const percentageFormatter = val =>
  val || val === 0 ? `${val}%` : 'No data'

export const absoluteToPercentsFormatter = val => {
  const percents = 100 * val
  return percentageFormatter(percents.toFixed(2))
}

export const mvrvFormatter = val => absoluteToPercentsFormatter(val - 1)

export const tooltipValueFormatter = ({
  value,
  formatter,
  threshold = 1000
}) => {
  if (formatter) {
    return formatter(value)
  }

  const numValue = +value
  if (!Number.isFinite(numValue)) {
    return 'No data'
  }

  if (numValue > threshold) {
    return millify(numValue, 2)
  }

  return numValue.toFixed(2)
}

export const tooltipLabelFormatter = value => {
  const date = new Date(value)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}
