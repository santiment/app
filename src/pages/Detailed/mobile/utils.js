import { Metrics } from '../../../ducks/SANCharts/data'

export const DEFAULT_METRIC = {
  key: 'historyPrice',
  ...Metrics['historyPricePreview'].reqMeta
}

export const DEFAULT_TIME_RANGE = '6m'

export const MAX_METRICS_PER_CHART = 3

export const POPULAR_METRICS = [
  Metrics.daily_active_addresses,
  Metrics.devActivity,
  Metrics.socialVolume
]

export const makeRequestedData = ({ metrics, ...rest }) => {
  const requestedMetrics = metrics
    .filter(({ type = 'metrics' }) => type === 'metrics')
    .map(({ key, reqMeta }) => ({ name: key, ...rest, ...reqMeta }))

  const requestedMarketSegments = metrics
    .filter(({ type }) => type === 'marketSegments')
    .map(({ key: name, reqMeta }) => ({ name, ...rest, ...reqMeta }))

  const requestedEvents = metrics
    .filter(
      ({ anomalyKey, type = 'metrics' }) => anomalyKey && type === 'metrics'
    )
    .map(({ key, anomalyKey }) => ({
      name: anomalyKey ? 'anomalies' : key,
      metric: anomalyKey,
      metricKey: key,
      ...rest
    }))

  return {
    metrics: requestedMetrics,
    events: requestedEvents,
    marketSegments: requestedMarketSegments
  }
}
