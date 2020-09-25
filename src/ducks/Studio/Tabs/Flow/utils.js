import { getDateFormats, addDays } from '../../../../utils/dates'
import { millify } from '../../../../utils/formatting'

export function getDateByDayIndex ([from], dayIndex) {
  const { DD, MMM, YYYY } = getDateFormats(addDays(from, dayIndex))
  return `${DD} ${MMM} ${YYYY}`
}

export function sumCategory (flows) {
  const { length } = flows
  let sum = 0

  for (let i = 0; i < length; i++) {
    sum += flows[i]
  }

  return sum
}

export const format = (ticker, value) => `${millify(value)} ${ticker}`
