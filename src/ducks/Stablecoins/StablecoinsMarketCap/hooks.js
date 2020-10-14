import { Metric } from '../../dataHub/metrics'
import { useMemo } from 'react'
import { CHECKING_STABLECOINS } from './utils'
import { useTimeseries } from '../../Studio/timeseries/hooks'

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

export const useStablecoinsTimeseries = (settings, metrics, rootMetric) => {
  const [data, loadings] = useTimeseries(
    metrics,
    // HACK: Since the metric's hash doesn't change (done on purpose), forcing useTimseries to refetch data with new queryKey
    // This allows us to compute chart colors and tooltip info only at the app start. [@vanguard | Sep 8, 2020]
    useMemo(() => ({ ...settings }), [settings, rootMetric])
  )

  return {
    data,
    loadings,
    rootMetric
  }
}

export const useStablecoinMetrics = rootMetric => {
  const metrics = useMemo(() => buildStablecoinMetrics(rootMetric), [
    rootMetric
  ])

  return metrics
}
