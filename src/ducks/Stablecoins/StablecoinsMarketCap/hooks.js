import { useMemo, useState } from 'react'
import {
  CHECKING_STABLECOINS,
  REQ_META,
  STABLECOIN_MARKETCAP_USD_METRIC
} from './utils'
import { useTimeseries } from '../../Studio/timeseries/hooks'

function buildStablecoinMetrics (rootMetric) {
  const { key: queryKey, node } = rootMetric

  return CHECKING_STABLECOINS.map(({ slug, ...metric }) =>
    Object.assign(metric, {
      node,
      queryKey,
      domainGroup: 'stablecoins',
      reqMeta: {
        ...REQ_META[metric.key],
        slug
      }
    })
  )
}

export const useStablecoinsTimeseries = settings => {
  const [rootMetric, setRootMetric] = useState(STABLECOIN_MARKETCAP_USD_METRIC)
  const metrics = useMemo(() => buildStablecoinMetrics(rootMetric), [
    rootMetric
  ])
  const [data, loadings] = useTimeseries(
    metrics,
    // HACK: Since the metric's hash doesn't change (done on purpose), forcing useTimseries to refetch data.
    // This allows us to compute chart colors and tooltip info only at the app start. [@vanguard | Sep 8, 2020]
    useMemo(() => ({ ...settings }), [rootMetric])
  )

  return {
    data,
    loadings,
    metrics,
    rootMetric,
    setRootMetric
  }
}
