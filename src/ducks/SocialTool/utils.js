import { Metric } from '../dataHub/metrics'
import { TooltipSetting } from '../dataHub/tooltipSettings'

const MetricsCache = new Map()

export const metricHash = (metric, selector) => metric + '_' + selector

export const buildKey = (key, selector) =>
  `${key}_${selector.replace(/[- ]/g, '')}`

export const buildMetric = ({ metric, text, asset, ticker, detectedAsset }) => {
  if (metric === Metric.price_usd) {
    return buildPriceMetric(metric, asset, ticker)
  }

  if (metric.extraSelector === 'text') {
    return detectedAsset
      ? buildAssetBasedMetric(metric, detectedAsset)
      : buildTextBasedMetric(metric, text)
  }

  return metric
}

export function buildTextBasedMetric (metric, text) {
  const key = buildKey(metric.key, text)
  const cached = MetricsCache.get(key)

  if (cached) {
    return cached
  }

  const { key: metricKey, label, formatter } = metric

  const textMetric = {
    ...metric,
    key,
    queryKey: metricKey,
    domainGroup: metricKey,
    useOriginColor: true,
    reqMeta: {
      text
    }
  }

  TooltipSetting[key] = {
    formatter,
    label
  }

  MetricsCache.set(key, textMetric)

  return textMetric
}

export function buildAssetBasedMetric (metric, project) {
  const { name, slug, ticker } = project
  const text = name + ticker
  const key = buildKey(metric.key, text)
  const cached = MetricsCache.get(key)

  if (cached) {
    return cached
  }

  const { key: metricKey, label, formatter } = metric

  const Metric = {
    ...metric,
    key,
    queryKey: metricKey,
    domainGroup: metricKey,
    useOriginColor: true,
    reqMeta: {
      slug
    }
  }

  TooltipSetting[key] = {
    formatter,
    label
  }

  MetricsCache.set(key, Metric)

  return Metric
}

export function buildPriceMetric (metric, slug, ticker) {
  const key = buildKey(metric.key, slug)
  const cached = MetricsCache.get(key)

  if (cached) {
    return cached
  }

  const label = `${ticker} / USD`

  const { key: metricKey, formatter } = metric

  const priceMetric = {
    ...metric,
    key,
    label,
    useOriginColor: true,
    queryKey: metricKey,
    reqMeta: { slug }
  }

  TooltipSetting[key] = { label, formatter }

  MetricsCache.set(key, priceMetric)

  return priceMetric
}
