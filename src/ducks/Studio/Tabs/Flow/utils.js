import { getDateFormats, addDays } from '../../../../utils/dates'

export function getDateByDayIndex ([from], dayIndex) {
  const { DD, MMM, YYYY } = getDateFormats(addDays(from, dayIndex))
  return `${DD} ${MMM} ${YYYY}`
}
