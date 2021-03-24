import { useCallback } from 'react'
import { Metric } from '../dataHub/metrics'

export function mapDEXMetrics ({
  metrics,
  measurement,
  slug: priceSlug,
  ticker = priceSlug
}) {
  const measurementSlug = measurement.slug.replace(/-/g, '_')

  const dexMetrics = metrics.map(({ key, label }) => {
    return {
      key: `${measurementSlug}_${key}`,
      queryKey: key,
      label,
      node: 'bar',
      fill: true,
      domainGroup: 'decentralized_exchanges',
      reqMeta: { slug: measurement.slug }
    }
  })

  console.log(priceSlug, ticker)

  if (priceSlug) {
    dexMetrics.push({
      ...Metric.price_usd,
      label: `Price (${ticker})`,
      reqMeta: { slug: priceSlug }
    })
  }

  return dexMetrics
}

export const DEFAULT_DEX_PROJECT = {
  slug: 'ethereum',
  ticker: 'Ethereum'
}

export const useProjectMetricBuilder = ({ measurement, baseMetrics }) => {
  return useCallback(
    ({ slug, ticker }) => {
      if (!slug) {
        return []
      }

      return mapDEXMetrics({
        metrics: baseMetrics,
        measurement,
        slug,
        ticker
      })
    },
    [measurement]
  )
}
