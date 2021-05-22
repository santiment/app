export function parseMetricGraphValue (graph, KnownMetric) {
  const MetricValue = {}

  Object.keys(graph || {}).forEach(metricKey => {
    const metric = KnownMetric[metricKey]
    if (metric) MetricValue[metric.key] = graph[metricKey]
  })

  return MetricValue
}
