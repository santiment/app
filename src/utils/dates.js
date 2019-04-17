export const ONE_SECOND_IN_MS = 1000
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60
export const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60
export const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24
export const ONE_MONTH_IN_MS = 2505600000 // Estimate
export const ONE_YEAR_IN_MS = 31557600000 // Estimate

export const SECOND = 's'
export const MINUTE = 'min'
export const HOUR = 'h'
export const DAY = 'd'
export const MONTH = 'm'
export const YEAR = 'y'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const SHORT_MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const WEEK_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const SHORT_WEEK_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const DateFormat = {
  [MONTH]: ['getMonth', 'setMonth'],
  [DAY]: ['getDate', 'setDate']
}

const FormatToIndex = {
  [SECOND]: 0,
  [MINUTE]: 1,
  [HOUR]: 2,
  [DAY]: 3,
  [MONTH]: 4,
  [YEAR]: 5
}

const FormatToString = {
  [SECOND]: 'second',
  [MINUTE]: 'minute',
  [HOUR]: 'hour',
  [DAY]: 'day',
  [MONTH]: 'month',
  [YEAR]: 'year'
}

const FormatToTimestamp = {
  [SECOND]: ONE_SECOND_IN_MS,
  [MINUTE]: ONE_MINUTE_IN_MS,
  [HOUR]: ONE_HOUR_IN_MS,
  [DAY]: ONE_DAY_IN_MS
}

/**
 * @param {number} amount - Amount of days/months to add or substract
 * @param {'d'|'m'} dateFormat - Modifier
 *
 * @example
 * // Getting past interval
 * // Current date: 16th April 2019
 * // Target: 9 days prior to current date
 * // getTimeIntervalFromToday(-9, 'd')
 */
export const getTimeIntervalFromToday = (amount, dateFormat) => {
  const from = new Date()
  const to = new Date()
  const [get, set] = DateFormat[dateFormat]

  to.setHours(24, 0, 0, 0)
  from.setHours(0, 0, 0, 0)

  const target = amount < 0 ? from : to

  target[set](from[get]() + amount)

  return {
    from,
    to
  }
}

const calculateUnitByFormat = (diff, format) =>
  parseInt(diff / FormatToTimestamp[format], 10)

const getUnitFormattedString = (amount, format) => {
  if (format === SECOND && amount < 60) {
    return 'a few seconds ago'
  }

  const number = amount + ' '
  const plural = amount > 1 ? 's' : ''

  return `${number}${FormatToString[format]}${plural} ago`
}

/**
 * @param {Object} args - Arguments
 * @param {Date} args.from - from
 * @param {Date} args.to - to
 * @param {'y'|'m'|'d'|'h'|'min'|'s'} args.format - format in which return the string
 *
 * @example
 * // Getting the difference from: 2nd April 2019
 * // to: 4th April 2019
 * dateDifferenceInWords({ from: new Date(2019, 3, 2), to: new Date(2019, 3, 4)})
 * //=> '2 days ago'
 *
 */
export const dateDifferenceInWords = ({
  from,
  to = new Date(),
  format = YEAR
}) => {
  const diff = to - from
  let resultFormat

  if (diff < ONE_MINUTE_IN_MS) {
    resultFormat = SECOND
  } else if (diff < ONE_HOUR_IN_MS) {
    resultFormat = MINUTE
  } else if (diff < ONE_DAY_IN_MS) {
    resultFormat = HOUR
  } else if (diff < ONE_MONTH_IN_MS) {
    resultFormat = DAY
  } else if (diff < ONE_YEAR_IN_MS) {
    resultFormat = MONTH
  } else {
    resultFormat = YEAR
  }
  resultFormat =
    FormatToIndex[format] < FormatToIndex[resultFormat] ? format : resultFormat

  let result
  if (resultFormat === YEAR || resultFormat === MONTH) {
    const yearDiff = to.getFullYear() - from.getFullYear()
    const monthDiff = to.getMonth() - from.getMonth() + yearDiff * 12
    if (monthDiff > 11 && format === YEAR) {
      resultFormat = YEAR
      result = yearDiff
    } else {
      result = monthDiff
    }
  } else {
    result = calculateUnitByFormat(diff, resultFormat)
  }

  return getUnitFormattedString(result, resultFormat)
}

export const getDateFormats = date => {
  const month = date.getMonth()
  const M = month + 1
  const D = date.getDate()
  const d = date.getDay()

  return {
    D,
    DD: D < 10 ? `0${D}` : D,
    ddd: WEEK_DAY_NAMES[d],
    dddd: SHORT_WEEK_DAY_NAMES[d],
    M,
    MM: M < 10 ? `0${M}` : M,
    MMM: SHORT_MONTH_NAMES[month],
    MMMM: MONTH_NAMES[month],
    YYYY: date.getFullYear()
  }
}
