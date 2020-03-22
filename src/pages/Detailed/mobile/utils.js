import { Metric } from '../../../ducks/dataHub/metrics'

export const DEFAULT_METRIC = {
  key: 'price_usd',
  ...Metric.historyPricePreview.reqMeta
}

export const DEFAULT_TIME_RANGE = '6m'

export const MAX_METRICS_PER_CHART = 3

export const POPULAR_METRICS = [
  Metric.daily_active_addresses,
  Metric.dev_activity,
  Metric.social_volume_total
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
      name: 'anomalies',
      metric: anomalyKey,
      metricKey: key,
      ...rest
    }))

  metrics
    .filter(({ type }) => type === 'events')
    .forEach(({ key }) =>
      requestedEvents.push({
        name: key,
        metricKey: key,
        ...rest
      })
    )

  return {
    metrics: requestedMetrics,
    events: requestedEvents,
    marketSegments: requestedMarketSegments
  }
}

export const convertEventsToObj = events => {
  const res = {}

  events.forEach(({ datetime, ...rest }) => {
    if (!res[datetime]) {
      res[datetime] = []
    }

    res[datetime].push({ ...rest })
  })

  return res
}
