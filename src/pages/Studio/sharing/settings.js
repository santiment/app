export function parseMetricGraphValue (graph, KnownMetric, metrics) {
  const MetricValue = {}

  if (!graph) return MetricValue

  metrics.forEach(metricKey => {
    if (!graph[metricKey]) return

    const metric = KnownMetric[metricKey]
    if (metric) MetricValue[metric.key] = graph[metricKey]
  })

  return MetricValue
}
