const DateFormat = {
  m: ['getMonth', 'setMonth'],
  d: ['getDate', 'setDate']
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

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

export const timeDifference = ({ from, to = Date.now() }) => {
  const diff = to - from
  const result = []

  const seconds = parseInt(diff / ONE_SECOND, 10)
  result.push(seconds)

  if (seconds < 60) return result

  const minutes = parseInt(diff / ONE_MINUTE, 10)
  result.push(minutes)

  if (minutes < 60) return result

  const hours = parseInt(diff / ONE_HOUR, 10)
  result.push(hours)

  if (hours < 24) return result

  const days = parseInt(diff / ONE_DAY, 10)
  result.push(days)

  return result
}

const FormatToIndex = {
  s: 0,
  min: 1,
  h: 2,
  d: 3,
  m: 4,
  y: 5
}

const IndexToFormat = ['s', 'min', 'h', 'd', 'm', 'y']

const _getTimeFromTo = (from, to = new Date(), format = 'y') => {
  if (format === 'y') {
    return to.getFullYear() - from.getFullYear()
  }
  if (format === 'm') {
    let months = to.getMonth() - from.getMonth()
    if (months < 0) {
      months += 12
    }
    return months
  }

  return timeDifference({ from, to })[FormatToIndex[format]]
}

const FormatToString = {
  s: 'second',
  min: 'minute',
  h: 'hour',
  d: 'day',
  m: 'month',
  y: 'year'
}

const getFormattedDiffString = (amount, format) => {
  if (format === 's' && amount < 60) {
    return 'a few seconds ago'
  }

  let article = ''
  let number = ''
  let plural = ''

  if (amount === 1) {
    article = format === 'h' ? 'an ' : 'a '
  } else {
    plural = 's'
    number = amount + ' '
  }

  return `${article}${number}${FormatToString[format]}${plural} ago`
}

export const getTimeFromTo = (from, to = new Date(), format = 'y') => {
  let index = FormatToIndex[format]
  let result

  while (index > -1) {
    result = _getTimeFromTo(from, to, IndexToFormat[index])
    if (result) break
    index--
  }

  return getFormattedDiffString(result, IndexToFormat[index])
}
