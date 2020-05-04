import { Metric } from '../dataHub/metrics'
import { TooltipSetting } from '../dataHub/tooltipSettings'

const MetricsCache = new Map()

export const metricHash = (metric, selector) => metric + '_' + selector

export const buildKey = (key, selector) =>
  `${key}_${selector.replace(/[^a-zA-Z]+/g, '')}`

export function buildMetrics (metrics, topics) {
  const transformedMetrics = []
  const priceMetric = metrics.find(({ key }) => key === Metric.price_usd.key)
  topics.forEach(topic => {
    metrics.forEach(metric => {
      if (metric.key === Metric.price_usd.key) {
        return
      }

      const transformedMetric = buildMetric(metric, topic)
      transformedMetrics.push(transformedMetric)
    })
  })

  transformedMetrics.splice(1, 0, priceMetric)

  return transformedMetrics
}

function buildMetric (metric, text) {
  if (metric === Metric.price_usd) {
    return metric
  }

  return buildTextBasedMetric(metric, text)
}

export function buildTextBasedMetric (metric, text) {
  const key = buildKey(metric.key, text)
  const cached = MetricsCache.get(key)

  if (cached) {
    return cached
  }

  const { key: metricKey, label, shortLabel = label, formatter } = metric

  const clippedText = text.length > 20 ? text.slice(0, 20) + '...' : text

  const textMetric = {
    ...metric,
    key,
    queryKey: metricKey,
    domainGroup: metricKey,
    useOriginColor: true,
    label: `${clippedText}, ${shortLabel}`,
    text
  }

  TooltipSetting[key] = {
    formatter,
    label: `${clippedText}, ${shortLabel}`
  }

  MetricsCache.set(key, textMetric)

  return textMetric
}
