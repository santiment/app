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
export const WEEK = 'w'
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

const CRYPTO_ERA_START_DATE = new Date('2009-01-01T01:00:00.000Z')

/**
 * @param {number} amount - Amount of days/months to add or substract
 * @param {'d'|'m'} dateFormat - Modifier
 *
 * @example
 * // Getting past interval
 * // Current date: 16th April 2019
 * // Target: 9 days prior to current date
 *  getTimeIntervalFromToday(-9, 'd')
 */
export const getTimeIntervalFromToday = (amount, dateFormat, options = {}) => {
  const { from = new Date(), to = new Date(), isUTC } = options
  const [get, set] = DateFormat[dateFormat]

  const setHours = isUTC ? 'setUTCHours' : 'setHours'

  to[setHours](23, 59, 59, 999)
  from[setHours](0, 0, 0, 0)

  const target = amount <= 0 ? from : to

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

export const dateDifference = ({ from, to = new Date(), format = YEAR }) => {
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

  return { diff: result, format: resultFormat }
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
export const dateDifferenceInWords = args => {
  const { diff, format } = dateDifference(args)
  return getUnitFormattedString(diff, format)
}

/**
 *
 * @param {Date} date - Date object to get formats from
 *
 * @description
 * Format tokens are similar to the "moment.js"
   *
   * @example
   * // Getting formats for current date
   * const {dddd, D, MMMM, YYYY} = getDateFormats(new Date())
   * console.log(`${dddd}, ${D} ${MMMM} ${YYYY}`)
   * //=> "Wednesday, 17 April 2019"

 */
export const getDateFormats = date => {
  const month = date.getMonth()
  const M = month + 1
  const D = date.getDate()
  const d = date.getDay()
  const YYYY = date.getFullYear()

  return {
    D,
    DD: D < 10 ? `0${D}` : D,
    ddd: SHORT_WEEK_DAY_NAMES[d],
    dddd: WEEK_DAY_NAMES[d],
    M,
    MM: M < 10 ? `0${M}` : M,
    MMM: SHORT_MONTH_NAMES[month],
    MMMM: MONTH_NAMES[month],
    YYYY,
    YY: YYYY.toString().slice(-2)
  }
}

export const getUTCDateFormats = date => {
  const month = date.getUTCMonth()
  const M = month + 1
  const D = date.getUTCDate()
  const d = date.getUTCDay()
  const YYYY = date.getUTCFullYear()

  return {
    D,
    DD: D < 10 ? `0${D}` : D,
    ddd: SHORT_WEEK_DAY_NAMES[d],
    dddd: WEEK_DAY_NAMES[d],
    M,
    MM: M < 10 ? `0${M}` : M,
    MMM: SHORT_MONTH_NAMES[month],
    MMMM: MONTH_NAMES[month],
    YYYY,
    YY: YYYY.toString().slice(-2)
  }
}

export const getTimeFormats = date => {
  const m = date.getMinutes()
  const s = date.getSeconds()
  const H = date.getHours()

  return {
    H,
    HH: H < 10 ? `0${H}` : H,
    m,
    mm: m < 10 ? `0${m}` : m,
    s,
    ss: s < 10 ? `0${s}` : s
  }
}

export const getUTCTimeFormats = date => {
  const m = date.getUTCMinutes()
  const s = date.getUTCSeconds()
  const H = date.getUTCHours()

  return {
    H,
    HH: H < 10 ? `0${H}` : H,
    m,
    mm: m < 10 ? `0${m}` : m,
    s,
    ss: s < 10 ? `0${s}` : s
  }
}

export const parseIntervalString = range => {
  const amount = parseInt(range, 10)
  return {
    amount,
    format: range.slice(amount.toString().length)
  }
}

/**
 *
 * @param {string} timeRange - String which represents time range from the current datetime
 * @param {object} options - Additional options
 *
 *
 * @example
 * // Getting time range for '2m'
 * // Current datetime -> "2019-04-08T00:00:00.000Z"
 * getIntervalByTimeRange('2m')
 * //=> {from: new Date("2019-02-08T00:00:00.000Z"), to: new Date("2019-04-08T00:00:00.000Z") }
 */
export const getIntervalByTimeRange = (timeRange, options = {}) => {
  if (timeRange === 'all') {
    if (options.isMobile) {
      return getTimeIntervalFromToday(-24, MONTH)
    }

    return {
      to: getTimeIntervalFromToday(-1, DAY).to,
      from: CRYPTO_ERA_START_DATE
    }
  } else if (timeRange === '1d') {
    const from = new Date()
    const to = new Date()

    const currentHour = from.getHours()
    from.setHours(currentHour - 24, 0, 0, 0)
    to.setHours(currentHour + 1, 0, 0, 0)

    return { from, to }
  }

  const result = parseIntervalString(timeRange)

  if (result.format === WEEK) {
    result.amount = result.amount * 7
    result.format = DAY
  } else if (result.format === YEAR) {
    result.amount = result.amount * 12
    result.format = MONTH
  }

  return getTimeIntervalFromToday(-result.amount, result.format)
}

export const toEndOfDay = target => {
  target.setHours(24, 0, 0, 0)
  return target
}

export const addDays = (date, days) => {
  let result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const addMinutes = (date, minutes) => {
  let result = new Date(date)
  result.setTime(result.getTime() + minutes * 60 * 1000)
  return result
}

export const dateDifferenceInWordsString = dateString =>
  dateDifferenceInWords({
    from: new Date(dateString)
  })

export const make12Hours = (hours, fillZero = true) => {
  hours = hours % 12
  hours = hours || 12

  if (!fillZero) {
    return hours
  }

  return hours < 10 ? '0' + hours : hours
}

export const getAmPmWithHours = hours => {
  if (hours < 0) {
    hours = 24 - hours
  }

  var ampm = getAmPm(hours)

  return make12Hours(hours, false) + ampm
}

export const getAmPm = hours => (hours >= 12 ? 'pm' : 'am')
