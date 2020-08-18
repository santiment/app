import { parseIntervalString } from '../../utils/dates'

const IntervalFormatDividend = {
  h: 24,
  m: 60 * 24
}

export function mergeMetricSettingMap (oldMap, newMap) {
  const mergedMap = new Map(oldMap)

  newMap.forEach((newSettings, metric) =>
    mergedMap.set(metric, Object.assign({}, oldMap.get(metric), newSettings))
  )

  return mergedMap
}

export function calculateMovingAverageFromInterval (interval) {
  const { amount, format } = parseIntervalString(interval)

  const dividend = IntervalFormatDividend[format] || 1

  return (dividend / amount) * 7
}
