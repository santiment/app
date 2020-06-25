export function mergeMetricSettingMap(oldMap, newMap) {
  const mergedMap = new Map()

  newMap.forEach((newSettings, metric) =>
    mergedMap.set(metric, Object.assign({}, oldMap.get(metric), newSettings)),
  )

  return mergedMap
}
