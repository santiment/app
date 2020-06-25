import { MirroredMetric } from '../dataHub/metrics/mirrored'
import { parseIntervalString } from '../../utils/dates'

const IntervalFormatDividend = {
  h: 24,
  m: 60 * 24,
}

export function extractMirrorMetricsDomainGroups(domainGroups) {
  if (!domainGroups) return

  const mirroredGroups = []

  const { length } = domainGroups
  for (let i = 0; i < length; i++) {
    const group = domainGroups[i]
    for (let y = group.length; y > 0; y--) {
      const metricKey = group[y]

      if (MirroredMetric[metricKey]) {
        mirroredGroups.push(group)
        break
      }
    }
  }

  return mirroredGroups
}

export function mergeMetricSettingMap(oldMap, newMap) {
  const mergedMap = new Map()

  newMap.forEach((newSettings, metric) =>
    mergedMap.set(metric, Object.assign({}, oldMap.get(metric), newSettings)),
  )

  return mergedMap
}

export function calculateMovingAverageFromInterval(interval) {
  const { amount, format } = parseIntervalString(interval)

  const dividend = IntervalFormatDividend[format] || 1

  return (dividend / amount) * 7
}
