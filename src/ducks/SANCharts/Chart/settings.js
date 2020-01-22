import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import { millify } from '../../../utils/formatting'

export const BRUSH_HEIGHT = 40

export const CHART_PADDING = {
  top: 10,
  right: 0,
  bottom: 23 + BRUSH_HEIGHT + 10,
  left: 45
}

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
  isAnomaly: {
    label: 'Anomaly',
    formatter: v => v
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
  }
}
