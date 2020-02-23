import gql from 'graphql-tag'
import { Metrics, tooltipSettings } from '../../SANCharts/data'
import { persimmon } from '@santiment-network/ui/variables.scss'

export const OLD_ANOMALY_QUERY = gql`
  query metricAnomaly(
    $from: DateTime!
    $metric: AnomaliesMetricsEnum!
    $slug: String!
    $to: DateTime!
  ) {
    metricAnomaly(from: $from, to: $to, slug: $slug, metric: $metric) {
      datetime
    }
  }
`

export const GET_ANOMALY_QUERY = gql`
  query getAnomaly(
    $metric: String!
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval
  ) {
    getAnomaly(anomaly: $metric) {
      timeseriesData(slug: $slug, from: $from, to: $to, interval: $interval) {
        datetime
      }
    }
  }
`

export const ANOMALIES = [
  'daily_active_addresses',
  'dev_activity',
  'exchange_balance'
]

export const AnomalyFetcher = {
  query: GET_ANOMALY_QUERY,
  preTransform: key => ({
    data: {
      getAnomaly: { timeseriesData }
    }
  }) =>
    timeseriesData.map(({ datetime }) => {
      const metric = key.replace('_anomaly', '')
      const { label: value } = Metrics[metric]
      return {
        key,
        metric,
        value,
        color: persimmon,
        datetime: +new Date(datetime)
      }
    })
}

export const OldAnomalyFetcher = {
  query: OLD_ANOMALY_QUERY,
  preTransform: metric => ({ data: { metricAnomaly } }) =>
    metricAnomaly.map(({ datetime }) => {
      const { label: value } = Metrics[metric]
      return {
        key: 'isAnomaly',
        color: persimmon,
        datetime: +new Date(datetime),
        metric,
        value
      }
    })
}

ANOMALIES.forEach(anomaly => {
  tooltipSettings[anomaly + '_anomaly'] = {
    label: 'Anomaly',
    formatter: v => v
  }
})

export function buildAnomalies (metrics) {
  return metrics
    .filter(({ key, anomalyKey }) => anomalyKey || ANOMALIES.includes(key))
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey || key + '_anomaly',
      queryKey: anomalyKey ? 'anomalies' : 'anomaly',
      metricAnomaly: key
    }))
}
