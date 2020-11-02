export function getMetricSetting (MetricSettingMap, metric) {
  const metricSetting = MetricSettingMap.get(metric)
  if (metricSetting) return metricSetting

  const newMetricSetting = {}
  MetricSettingMap.set(metric, newMetricSetting)
  return newMetricSetting
}
