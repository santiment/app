import { stringify, parse } from 'query-string'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from './defaults'
import { buildCompareKey } from './Compare/utils'
import { Event } from '../dataHub/events'
import { Metric } from '../dataHub/metrics'
import { Submetrics } from '../dataHub/submetrics'
import { CompatibleMetric } from '../dataHub/metrics/compatibility'
import { tryMapToTimeboundMetric } from '../dataHub/timebounds'

const { trendPositionHistory } = Event

export const COMPARE_CONNECTOR = '-CC-'
const getMetricsKeys = metrics => metrics.map(({ key }) => key)
const toArray = keys => (typeof keys === 'string' ? [keys] : keys)
const convertKeyToMetric = (key, dict) =>
  dict[key] ||
  CompatibleMetric[key] ||
  searchFromSubmetrics(key) ||
  tryMapToTimeboundMetric(key)

export const reduceStateKeys = (State, Data) =>
  Object.keys(State).reduce((acc, key) => {
    const value = Data[key]
    if (value) {
      acc[key] = parseValue(value)
    }
    return acc
  }, {})

const convertKeysToMetrics = (keys, dict) =>
  keys &&
  toArray(keys)
    .filter(Boolean)
    .map(key => convertKeyToMetric(key, dict))

function searchFromSubmetrics (key) {
  for (let list of Object.values(Submetrics)) {
    const found = list.find(({ key: subMetricKey }) => subMetricKey === key)
    if (found) return found
  }
}

export function shareComparable (Comparable) {
  const { project, metric } = Comparable
  const { slug, ticker } = project
  const { key } = metric

  return `${slug}${COMPARE_CONNECTOR}${ticker}${COMPARE_CONNECTOR}${key}`
}

function parseValue (value) {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }

  return value
}

function sanitize (array) {
  if (!array) return

  const cleaned = array.filter(Boolean)
  return cleaned.length === 0 ? undefined : cleaned
}

export function parseComparable (comparable) {
  const [slug, ticker, metricKey] = comparable.split(COMPARE_CONNECTOR)
  const metric = convertKeyToMetric(metricKey, Metric)

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
}

function parseSharedComparables (comparables) {
  if (!comparables) return

  const arr = toArray(comparables)

  return arr.map(parseComparable)
}

export function generateShareLink (
  settings,
  options,
  metrics = [],
  events = [],
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

export function parseUrl (
  settings = DEFAULT_SETTINGS,
  options = DEFAULT_OPTIONS
) {
  const data = parse(window.location.search, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(settings, data),
    options: reduceStateKeys(options, data),
    metrics: sanitize(convertKeysToMetrics(data.metrics, Metric)),
    events: sanitize(convertKeysToMetrics(data.events, Event)),
    comparables: sanitize(parseSharedComparables(data.comparables))
  }
}
