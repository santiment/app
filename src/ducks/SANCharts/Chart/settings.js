import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import { Metrics } from '../data'

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

const FROMATTER = v => v || 'No data'

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
  }
}

Object.keys(Metrics).forEach(metric => {
  const { key, dataKey = key, formatter = FROMATTER, label } = Metrics[metric]
  tooltipSettings[dataKey] = {
    label,
    formatter
  }
})
