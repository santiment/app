import { millify } from '../../../../utils/formatting'

export const percentServerValueFormatter = value => value / 100
export const percentValueFormatter = value => value * 100

// for outside percent channel
export const percentValueMirrorFormatter = values => values[1] * 100
export const percentServerValueMirrorFormatter = value => [
  -value / 100,
  value / 100
]

export const mvrvFormatter = value =>
  percentValueFormatter(value - 1).toFixed(2)
export const mvrvServerFormatter = value =>
  percentServerValueFormatter(value) + 1

export function defaultFormatter (value, precision = 2) {
  return millify(value, precision)
}

const PLACES = {
  PREFIX: 'prefix',
  SUFFIX: 'suffix'
}

const BADGES_PLACES = {
  $: PLACES.PREFIX,
  '%': PLACES.SUFFIX,
  '₿': PLACES.SUFFIX,
  Ξ: PLACES.PREFIX
}

function withBadgePosition (badge, formatted) {
  if (BADGES_PLACES[badge] === PLACES.PREFIX) {
    return `${badge}${formatted}`
  } else {
    return `${formatted} ${badge}`
  }
}

export const formatterWithBadge = (
  badge = '',
  formatter = defaultFormatter
) => value => {
  if (badge === '₿') {
    const formatted = defaultFormatter(value, 6)
    return withBadgePosition(badge, formatted)
  } else {
    const formatted = formatter(value)
    return withBadgePosition(badge, formatted)
  }
}
