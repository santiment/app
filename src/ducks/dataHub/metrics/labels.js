import { Metric } from './index'

const Labels = {
  [Metric.dormant_circulation.key]: 'Dormant Circulation (365d)',
  holders_distribution_1_to_10: 'Supply distribution (number of addresses)',
  percent_of_holders_distribution_combined_balance_1_to_10:
    'Supply distribution (balance of addresses)'
}

export function getMetricLabel ({ key, label: metricLabel, base }, project) {
  let label = Labels[key] || metricLabel

  if (project && !base) {
    label += ` (${project.ticker})`
  }

  return label
}
