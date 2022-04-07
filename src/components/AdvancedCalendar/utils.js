import { MONTH_NAMES } from '../../utils/dates'

const groupStartIndeces = [0, 3, 6, 11, 14, 17]

const getDaysInMonth = (year, month) => new Date(20 + year, month, 0).getDate()

const shouldBreakOnChar = (char) => char === '/' || char === ' '

export function getValidityMsg (dateSettings) {
  if (!dateSettings) return ''

  const [day, fullMonth, year] = dateSettings

  const month = fullMonth - 1
  if (month < 0 || month > 11) {
    return 'Month value should be between "1" and "12"'
  }

  const daysInMonth = getDaysInMonth(year, fullMonth)
  if (day > daysInMonth) {
    return `${MONTH_NAMES[month]} has "${daysInMonth}" days, but tried to set "${day}"`
  }

  return ''
}

export function fixDateRangeString (input) {
  const fixed = input.value
    .split(' - ')
    .map((str) =>
      str
        .split('/')
        .map((value) => value.padStart(2, '0'))
        .join('/'),
    )
    .join(' - ')
  input.value = fixed
  return fixed
}

function prevModifyableGroupIndex (caret) {
  for (let i = groupStartIndeces.length - 1; i > -1; i--) {
    if (groupStartIndeces[i] < caret) {
      return groupStartIndeces[i]
    }
  }
  return groupStartIndeces[0]
}

function nextModifyableGroupIndex (caret) {
  for (let i = 0; i < groupStartIndeces.length; i++) {
    if (groupStartIndeces[i] > caret) {
      return groupStartIndeces[i]
    }
  }
  return groupStartIndeces[groupStartIndeces.length - 1]
}

export function selectNextGroup (el, toRight, caret = el.selectionStart) {
  const left = (toRight ? nextModifyableGroupIndex : prevModifyableGroupIndex)(caret)
  el.selectionStart = left
  el.selectionEnd = left + 2
}

export function extractGroupValue (str, index) {
  let left = index
  let right = index + 1
  const { length } = str

  for (; left > -1; left--) {
    if (shouldBreakOnChar(str[left])) break
  }
  for (; right < length; right++) {
    if (shouldBreakOnChar(str[right])) break
  }

  return str.slice(left + 1, right)
}
