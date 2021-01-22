import { millify } from '../../../../utils/formatting'

export const percentServerValueFormatter = value => value / 100
export const percentValueFormatter = value => value * 100

// for outside percent channel
export const percentValueMirrorFormatter = values => values[1] * 100
export const percentServerValueMirrorFormatter = value => [
  -value / 100,
  value / 100
]

export function defaultFormatter (value) {
  return millify(value, 2)
}

export const formatterWithBadge = (badge = '') => value =>
  `${badge}${defaultFormatter(value)}`
