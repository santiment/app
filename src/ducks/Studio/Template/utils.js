import { COMPARE_CONNECTOR, parseComparable } from '../url'
import { Metric } from '../../dataHub/metrics'

export function parseTemplateMetrics (templateMetrics) {
  const { length } = templateMetrics
  const metrics = []
  const comparables = []

  for (let i = 0; i < length; i++) {
    const metricKey = templateMetrics[i]

    if (metricKey.includes(COMPARE_CONNECTOR)) {
      comparables.push(parseComparable(metricKey))
    } else {
      const metric = Metric[metricKey]

      if (metric) {
        metrics.push(metric)
      }
    }
  }

  return {
    metrics,
    comparables
  }
}
