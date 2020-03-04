import { stringify, parse } from 'query-string'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from './defaults'
import { Events, Metrics, compatabilityMap } from '../SANCharts/data'
import { buildCompareKey } from './Compare/utils'

const { trendPositionHistory } = Events

const getMetricsKeys = metrics => metrics.map(({ key }) => key)
const toArray = keys => (typeof keys === 'string' ? [keys] : keys)
const convertKeyToMetric = (key, dict) => dict[key] || compatabilityMap[key]

const reduceStateKeys = (State, Data) =>
  Object.keys(State).reduce((acc, key) => {
    const value = Data[key]
    if (value) {
      acc[key] = value === 'false' ? false : value
    }
    return acc
  }, {})

const convertKeysToMetrics = (keys, dict) =>
  keys &&
  toArray(keys)
    .filter(Boolean)
    .map(key => convertKeyToMetric(key, dict))

function shareComparable (Comparable) {
  const { project, metric } = Comparable
  const { slug, ticker } = project
  const { key } = metric

  return `${slug}-${ticker}-${key}`
}

function sanitize (array) {
  if (!array) return

  const cleaned = array.filter(Boolean)
  return cleaned.length === 0 ? undefined : cleaned
}

function parseSharedComparables (comparables) {
  if (!comparables) return

  const arr = toArray(comparables)

  return arr.map(shared => {
    const [slug, ticker, metricKey] = shared.split('-')
    const metric = convertKeyToMetric(metricKey, Metrics)

    if (!metric) return undefined

    const project = {
      slug,
      ticker
    }

    return {
      key: buildCompareKey(metric, project),
      metric,
      project
    }
  })
}

export function generateShareLink (
  settings,
  options,
  metrics,
  events,
  comparables = []
) {
  const Shareable = {
    ...settings,
    ...options,
    metrics: getMetricsKeys(metrics),
    events: events.includes(trendPositionHistory)
      ? getMetricsKeys(events)
      : undefined,
    comparables: comparables.map(shareComparable)
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
    metrics: sanitize(convertKeysToMetrics(data.metrics, Metrics)),
    events: sanitize(convertKeysToMetrics(data.events, Events)),
    comparables: sanitize(parseSharedComparables(data.comparables))
  }
}

export const updateHistory = url => {
  const { history } = window
  history.replaceState(history.state, null, url)
}
