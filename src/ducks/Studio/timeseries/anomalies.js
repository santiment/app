import gql from 'graphql-tag'
import { Metric } from '../../dataHub/metrics'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
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

// Available anomalies could be fetched via "getAvailableAnomalies" query
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
  }) => {
    const metricKey = key.replace('_anomaly', '')
    const { label: value, dataKey = key } = Metric[metricKey]

    return timeseriesData.map(({ datetime }) => ({
      key,
      metric: dataKey,
      value,
      datetime,
      color: persimmon
    }))
  }
}

export const OldAnomalyFetcher = {
  query: OLD_ANOMALY_QUERY,
  preTransform: metricKey => ({ data: { metricAnomaly } }) => {
    const { key, dataKey = key, label: value } = Metric[metricKey]

    return metricAnomaly.map(({ datetime }) => ({
      datetime,
      value,
      key: 'isAnomaly',
      metric: dataKey,
      color: persimmon
    }))
  }
}

ANOMALIES.forEach(anomaly => {
  TooltipSetting[anomaly + '_anomaly'] = {
    label: 'Anomaly',
    formatter: v => v
  }
})

// TODO: Leave only new anomalies support after moving everywhere to useTimeseries [@vanguard | Feb 28, 2020]
export function buildAnomalies (metrics) {
  return metrics
    .filter(({ key, anomalyKey }) => anomalyKey || ANOMALIES.includes(key))
    .map(({ key, anomalyKey }) => {
      // TODO: Remove this shit after moving to useTimseries [@vanguard | Feb 28, 2020]
      const isNewAnomaly = ANOMALIES.includes(key)
      return {
        key: isNewAnomaly ? key + '_anomaly' : anomalyKey,
        queryKey: isNewAnomaly ? 'anomaly' : 'anomalies',
        metricAnomaly: key
      }
    })
}
