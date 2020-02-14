import { Metrics } from '../../ducks/SANCharts/data'

const { price_usd } = Metrics

export const validateMultiChart = activeMetrics =>
  activeMetrics.length - activeMetrics.includes(price_usd) > 1

export function buildAnomalies (metrics) {
  return metrics
    .filter(({ anomalyKey }) => anomalyKey)
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey,
      queryKey: 'anomalies',
      anomalyMetricKey: key
    }))
}
