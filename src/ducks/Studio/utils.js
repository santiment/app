import { MirroredMetric } from '../dataHub/metrics/mirrored'

export function extractMirrorMetricsDomainGroups (domainGroups) {
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

export function mergeMetricSettingMap (oldMap, newMap) {
  const mergedMap = new Map()

  newMap.forEach((newSettings, metric) =>
    mergedMap.set(metric, Object.assign({}, oldMap.get(metric), newSettings))
  )

  return mergedMap
}
