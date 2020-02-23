import { ANOMALIES } from './timeseries/anomalies'

export function buildAnomalies (metrics) {
  return metrics
    .filter(({ key, anomalyKey }) => anomalyKey || ANOMALIES.includes(key))
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey || key + '_anomaly',
      queryKey: anomalyKey ? 'anomalies' : 'anomaly',
      metricAnomaly: key
    }))
}
