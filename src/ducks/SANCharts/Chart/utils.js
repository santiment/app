import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../../utils/dates'
import { millify } from '../../../utils/formatting'

const formatter = v => v || 'No data'

export const tooltipSettings = {
  datetime: {
    formatter: value => {
      const date = new Date(value)
      const { HH, mm } = getTimeFormats(date)
      const { MMMM, DD, YYYY } = getDateFormats(date)
      return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
    }
  },
  priceUsd: {
    label: 'Price',
    formatter: value => `$${value.toFixed(2)}`
  },
  volume: {
    label: 'Volume',
    formatter: value => `$${value}`
  },
  followersCount: {
    label: 'Twitter',
    formatter: value => millify(value, 2)
  },
  activity: {
    label: 'Development Activity',
    formatter
  },
  socialVolume: {
    label: 'Social Volume',
    formatter
  },
  age_destroyed: {
    label: 'Token Age Destroyed',
    formatter: value => (value ? millify(value, 2) : 'No data')
  },
  daily_active_addresses: {
    label: 'Daily Active Addresses',
    formatter
  },
  isAnomaly: {
    label: 'Anomaly',
    formatter: () => 'Social Volume'
  },
  trendingPosition: {
    label: 'Trending Position',
    formatter: ([val]) => {
      switch (val) {
        case 1:
          return `1st`
        case 2:
          return '2nd'
        case 3:
          return '3rd'
        default:
          return `${val}th`
      }
    }
  }
}

export function clearCtx (chart, ctx = chart.ctx) {
  const { canvasWidth, canvasHeight } = chart
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

export function getDateDayMonthYear (date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

export const axesTickFormatters = {
  datetime: getDateDayMonthYear
}
