import { Metric } from '../../dataHub/metrics'
import { useMemo } from 'react'
import { CHECKING_STABLECOINS } from './utils'

function buildStablecoinMetrics (rootMetric) {
  const { key: queryKey, node } = rootMetric

  const metrics = CHECKING_STABLECOINS.filter(metric =>
    queryKey === Metric.price_usd.key
      ? metric.key !== 'TOTAL_MARKET'
      : metric.key !== 'BTC'
  )

  return metrics.map(metric => ({
    ...metric,
    node,
    queryKey,
    domainGroup:
      metric.key === 'TOTAL_MARKET' || metric.key === 'BTC'
        ? 'total'
        : 'stablecoins'
  }))
}

export const useStablecoinMetrics = rootMetric =>
  useMemo(() => buildStablecoinMetrics(rootMetric), [rootMetric])
