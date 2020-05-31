import { MONTH_NAMES } from '../../utils/dates'

const getDaysInMonth = (year, month) => new Date(20 + year, month, 0).getDate()

export const checkInvalidDate = (date) => Number.isNaN(+date)

export function getValidityMsg([day, fullMonth, year]) {
  const month = fullMonth - 1
  if (month < 0 || month > 11) {
    return 'Month value should be between "1" and "12"'
  } else {
    const daysInMonth = getDaysInMonth(year, fullMonth)
    return `${
      MONTH_NAMES[month]
    } has "${daysInMonth}" days, but tried to set "${day}"`
  }
}

export function fixDateRangeString(input) {
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

function prevModifyableGroupIndex(caret) {
  for (let i = groupStartIndeces.length - 1; i > -1; i--) {
    if (groupStartIndeces[i] < caret) {
      return groupStartIndeces[i]
    }
  }
  return groupStartIndeces[0]
}

function nextModifyableGroupIndex(caret) {
  for (let i = 0; i < groupStartIndeces.length; i++) {
    if (groupStartIndeces[i] > caret) {
      return groupStartIndeces[i]
    }
  }
  return groupStartIndeces[groupStartIndeces.length - 1]
}

export function selectNextGroup(el, toRight, caret = el.selectionStart) {
  const left = (toRight ? nextModifyableGroupIndex : prevModifyableGroupIndex)(
    caret,
  )
  el.selectionStart = left
  el.selectionEnd = left + 2
}
