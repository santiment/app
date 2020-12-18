import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { usdFormatter } from '../dataHub/metrics/formatters'
import { normalizeQueryAlias } from '../Studio/Compare/utils'

const WalletMetricCache = {}
const PriceMetricCache = {}

export function getValidInterval (from, to) {
  const interval = getNewInterval(from, to)
  return INTERVAL_ALIAS[interval] || interval
}

const metricBuilder = (cache, slugToMetric) => asset => {
  const key = asset.slug ? `${asset.slug}_${asset.infrastructure}` : asset
  const cached = cache[key]
  if (cached) return cached

  const metric = slugToMetric(asset)
  updateTooltipSetting(metric)
  cache[key] = metric

  return metric
}

export const walletMetricBuilder = metricBuilder(
  WalletMetricCache,
  ({ slug, infrastructure }) => ({
    key: normalizeQueryAlias(slug),
    label: slug,
    node: 'line',
    queryKey: 'historicalBalance',
    reqMeta: {
      slug,
      infrastructure: infrastructure || 'ETH'
    }
  })
)

export const priceMetricBuilder = metricBuilder(PriceMetricCache, slug => ({
  key: `hb_price_usd_${normalizeQueryAlias(slug)}`,
  label: `Price of ${slug}`,
  node: 'area',
  queryKey: 'price_usd',
  formatter: usdFormatter,
  reqMeta: {
    slug
  }
}))
