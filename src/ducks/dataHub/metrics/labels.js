import { Metric } from './index'

const Labels = {
  [Metric.dormant_circulation.key]: 'Dormant Circulation (365d)'
}

export function getMetricLabel ({ key, label: metricLabel, base }, project) {
  let label = Labels[key] || metricLabel

  if (project && !base) {
    label += ` (${project.ticker})`
  }

  return label
}
