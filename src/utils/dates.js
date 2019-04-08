export const ONE_SECOND_IN_MS = 1000
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60
export const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60
export const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24
export const ONE_MONTH_IN_MS = ONE_DAY_IN_MS * 29 // Estimate
export const ONE_YEAR_IN_MS = 31557600000 - ONE_MONTH_IN_MS // Estimate

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

const IndexToFormat = [SECOND, MINUTE, HOUR, DAY, MONTH, YEAR]

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

export const timeDifference = (from, to) => {
  const diff = to - from
  const result = []

  const seconds = parseInt(diff / ONE_SECOND_IN_MS, 10)
  result.push(seconds)

  if (seconds < 60) return result

  const minutes = parseInt(diff / ONE_MINUTE_IN_MS, 10)
  result.push(minutes)

  if (minutes < 60) return result

  const hours = parseInt(diff / ONE_HOUR_IN_MS, 10)
  result.push(hours)

  if (hours < 24) return result

  const days = parseInt(diff / ONE_DAY_IN_MS, 10)
  result.push(days)

  return result
}

const FormatToTimestamp = {
  [SECOND]: ONE_SECOND_IN_MS,
  [MINUTE]: ONE_MINUTE_IN_MS,
  [HOUR]: ONE_HOUR_IN_MS,
  [DAY]: ONE_DAY_IN_MS
}

const getDiffWithFormat = (diff, format) =>
  parseInt(diff / FormatToTimestamp[format], 10)

const _getTimeFromTo = (from, to = new Date(), format = YEAR) => {
  const isFormatYear = format === YEAR
  if (isFormatYear || format === MONTH) {
    const yearDiff = to.getFullYear() - from.getFullYear()
    const monthDiff = to.getMonth() - from.getMonth() + yearDiff * 12

    if (isFormatYear && monthDiff > 11) {
      return yearDiff
    }

    const dayDiff = getDiffWithFormat(to - from, DAY)

    if (format === MONTH && dayDiff > 28) {
      return monthDiff
    }
  }

  /* return timeDifference(from, to)[FormatToIndex[format]] */
  return getDiffWithFormat(to - from, format)
}
const getFormattedDiffString = (amount, format) => {
  if (format === SECOND && amount < 60) {
    return 'a few seconds ago'
  }

  const number = amount + ' '
  const plural = amount > 1 ? 's' : ''

  return `${number}${FormatToString[format]}${plural} ago`
}

export const getTimeFromTo = (from, to = new Date(), format = YEAR) => {
  let index = FormatToIndex[format]
  let result

  while (index > -1) {
    result = _getTimeFromTo(from, to, IndexToFormat[index])
    if (result) break
    index--
  }

  return getFormattedDiffString(result, IndexToFormat[index])
}

export const new_getTimeFromTo = (from, to = new Date(), format = YEAR) => {
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
  if (resultFormat === YEAR) {
    result = to.getFullYear() - from.getFullYear()
  } else if (resultFormat === MONTH) {
    result =
      to.getMonth() -
      from.getMonth() +
      (to.getFullYear() - from.getFullYear()) * 12
  } else {
    result = getDiffWithFormat(diff, resultFormat)
  }
  /* return timeDifference(from, to)[FormatToIndex[format]] */
  return getFormattedDiffString(result, resultFormat)
}
