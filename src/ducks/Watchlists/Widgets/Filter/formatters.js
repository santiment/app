import { millify } from '../../../../utils/formatting'

export const percentServerValueFormatter = value => value / 100
export const percentValueFormatter = value => value * 100

// for outside percent channel
export const percentValueMirrorFormatter = values => values[1] * 100
export const percentServerValueMirrorFormatter = value => [
  -value / 100,
  value / 100
]

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
  BTC: PLACES.SUFFIX,
  Ξ: PLACES.PREFIX
}

function withBadgePosition (badge, formatted) {
  if (BADGES_PLACES[badge] === PLACES.PREFIX) {
    return `${badge}${formatted}`
  } else {
    return `${formatted} ${badge}`
  }
}

export const formatterWithBadge = (badge = '') => value => {
  if (badge === 'BTC') {
    const formatted = defaultFormatter(value, 6)
    return withBadgePosition(badge, formatted)
  } else {
    const formatted = defaultFormatter(value)
    return withBadgePosition(badge, formatted)
  }
}
