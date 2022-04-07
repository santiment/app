import { parseIntervalString } from '../../utils/dates'

export function getTimePeriod (date, interval = '1d') {
  const { amount, format } = parseIntervalString(interval)
  const from = new Date(date)
  const to = new Date(date)

  if (format === 'd') {
    from.setDate(to.getDate() - amount)
  } else {
    from.setHours(to.getHours() - amount)
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    interval,
  }
}
