import { ANOMALIES } from './timeseries/anomalies'

export function buildAnomalies (metrics) {
  return metrics
    .filter(({ key }) => ANOMALIES.includes(key))
    .map(({ key }) => ({
      key: key + '_anomaly',
      queryKey: 'anomaly'
    }))
}
