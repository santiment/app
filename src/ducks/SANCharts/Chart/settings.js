import { Metrics, Events } from '../data'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import { millify } from '../../../utils/formatting'

export const CHART_HEIGHT = 350
export const BRUSH_HEIGHT = 40

export const CHART_PADDING = {
  top: 10,
  right: 0,
  bottom: 23,
  left: 45
}

export const CHART_WITH_BRUSH_PADDING = {
  top: 10,
  right: 0,
  bottom: 23 + BRUSH_HEIGHT + 10,
  left: 45
}

const LARGE_NUMBER_THRESHOLD = 99999

const FORMATTER = value => {
  if (!value && typeof value !== 'number') {
    return 'No data'
  }

  if (value > LARGE_NUMBER_THRESHOLD) {
    return millify(value, 2)
  }

  return Number.isInteger(value) ? value : value.toFixed(2)
}

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
    formatter: Events.position.formatter
  }
}

Object.values(Metrics).forEach(
  ({ key, dataKey = key, formatter = FORMATTER, label }) => {
    tooltipSettings[dataKey] = {
      label,
      formatter
    }
  }
)
