import { parse } from 'query-string'
import { getDateFormats, getTimeFormats } from '../../../../utils/dates'

export function formatDate(dateStr) {
  const date = new Date(dateStr)
  const { DD, MMM, YY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${DD} ${MMM}, ${YY}, ${HH}:${mm}`
}

export function getDatetimeFromUrl() {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  return data.datetime
}
