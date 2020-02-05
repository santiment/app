import { stringify, parse } from 'query-string'
import { Events, Metrics } from '../SANCharts/data'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from './defaults'

const { trendPositionHistory } = Events

const getMetricsKeys = metrics => metrics.map(({ key }) => key)

const reduceStateKeys = (State, Data) =>
  Object.keys(State).reduce((acc, key) => {
    const value = Data[key]
    if (value) {
      acc[key] = value === 'false' ? false : value
    }
    return acc
  }, {})

const convertKeysToMetric = (keys, dict) =>
  keys &&
  (typeof keys === 'string' ? [keys] : keys)
    .filter(Boolean)
    .map(key => dict[key])

export const updateHistory = url => {
  const { history } = window
  history.replaceState(history.state, null, url)
}

export function generateShareLink (settings, options, metrics, events) {
  const Shareable = {
    ...settings,
    ...options,
    metrics: getMetricsKeys(metrics),
    events: events.includes(trendPositionHistory)
      ? getMetricsKeys(events)
      : undefined
  }

  return stringify(Shareable, {
    arrayFormat: 'comma'
  })
}

export function parseUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(DEFAULT_SETTINGS, data),
    options: reduceStateKeys(DEFAULT_OPTIONS, data),
    metrics: convertKeysToMetric(data.metrics, Metrics),
    events: convertKeysToMetric(data.events, Events)
  }
}
