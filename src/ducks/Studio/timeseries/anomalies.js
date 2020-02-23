import gql from 'graphql-tag'
import { Metrics, tooltipSettings } from '../../SANCharts/data'
import { persimmon } from '@santiment-network/ui/variables.scss'

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

ANOMALIES.forEach(anomaly => {
  tooltipSettings[anomaly + '_anomaly'] = {
    label: 'Anomaly',
    formatter: v => v
  }
})
