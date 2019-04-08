export const ONE_SECOND_IN_MS = 1000
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60
export const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60
export const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24
export const ONE_MONTH_IN_MS = ONE_DAY_IN_MS * 29 // Estimate
export const ONE_YEAR_IN_MS = 31557600000 // Estimate

export const SECOND = 's'
export const MINUTE = 'min'
export const HOUR = 'h'
export const DAY = 'd'
export const MONTH = 'm'
export const YEAR = 'y'

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

export const getTimeIntervalFromToday = (amount, dateFormat) => {
  const from = new Date()
  const to = new Date()
  const [get, set] = DateFormat[dateFormat]

  to.setHours(24, 0, 0, 0)
  from.setHours(0, 0, 0, 0)

  from[set](from[get]() + amount)

  return {
    from,
    to
  }
}

const getDiffWithFormat = (diff, format) =>
  parseInt(diff / FormatToTimestamp[format], 10)

const getFormattedDiffString = (amount, format) => {
  if (format === SECOND && amount < 60) {
    return 'a few seconds ago'
  }

  const number = amount + ' '
  const plural = amount > 1 ? 's' : ''

  return `${number}${FormatToString[format]}${plural} ago`
}

export const getTimeFromTo = (from, to = new Date(), format = YEAR) => {
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
    result = getDiffWithFormat(diff, resultFormat)
  }

  return getFormattedDiffString(result, resultFormat)
}
