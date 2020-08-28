import { Metric } from './index'

const Labels = {
  [Metric.dormant_circulation.key]: 'Dormant Circulation (365d)'
}

export const getMetricLabel = ({
  key,
  label,
  activeMetricBtnFormatter: formatter
}) => {
  const value = Labels[key] || label
  return formatter ? formatter(value) : value
}
