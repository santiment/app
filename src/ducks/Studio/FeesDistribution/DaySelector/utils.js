import { getDateFormats } from '../../../../utils/dates'

export function getPreviousDays (count = 7, lastDay) {
  let days = new Array(count).fill({})
  days = days.map((day, idx) => {
    const date = new Date(lastDay)
    date.setDate(lastDay.getDate() - count + idx)

    const { YYYY, MMM, DD } = getDateFormats(date)

    const label = `${DD} ${MMM}, ${YYYY}`
    return { date, label }
  })

  return days
}
