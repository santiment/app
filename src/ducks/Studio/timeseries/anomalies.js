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
    const metric = key.replace('_anomaly', '')
    // HACK: Instead of replacing in multiple files [@vanguard | Feb 28, 2020]
    // TODO: Remove this shit after moving to useTimseries [@vanguard | Feb 28, 2020]
    const [replacedMetric, replacedKey] =
      metric === 'dev_activity' ? ['devActivity', 'isAnomaly'] : [metric, key]

    const { label: value, dataKey = replacedKey } = Metrics[replacedMetric]

    return timeseriesData.map(({ datetime }) => ({
      key: replacedKey,
      metric: dataKey,
      value,
      datetime,
      color: persimmon
    }))
  }
}

export const OldAnomalyFetcher = {
  query: OLD_ANOMALY_QUERY,
  preTransform: metric => ({ data: { metricAnomaly } }) => {
    const { key, dataKey = key, label: value } = Metrics[metric]

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
  tooltipSettings[anomaly + '_anomaly'] = {
    label: 'Anomaly',
    formatter: v => v
  }
})

// TODO: Leave only new anomalies support after moving everywhere to useTimeseries [@vanguard | Feb 28, 2020]
export function buildAnomalies (metrics) {
  return metrics
    .filter(({ key, anomalyKey }) => anomalyKey || ANOMALIES.includes(key))
    .map(({ key, anomalyKey }) => {
      // HACK: Instead of replacing in multiple files [@vanguard | Feb 28, 2020]
      // TODO: Remove this shit after moving to useTimseries [@vanguard | Feb 28, 2020]
      const replacedKey = key === 'devActivity' ? 'dev_activity' : key
      const isNewAnomaly = ANOMALIES.includes(replacedKey)
      return {
        key: isNewAnomaly ? replacedKey + '_anomaly' : anomalyKey,
        queryKey: isNewAnomaly ? 'anomaly' : 'anomalies',
        metricAnomaly: replacedKey
      }
    })
}
