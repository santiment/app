import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { usdFormatter } from '../dataHub/metrics/formatters'
import { normalizeQueryAlias } from '../Studio/Compare/utils'

const WalletMetricCache = {}
const PriceMetricCache = {}

const metricBuilder = (cache, slugToMetric) => asset => {
  const key = asset.slug || asset
  const cached = cache[key]
  if (cached) return cached

  const metric = slugToMetric(asset)
  updateTooltipSetting(metric)
  cache[key] = metric

  return metric
}

export const walletMetricBuilder = metricBuilder(
  WalletMetricCache,
  ({ slug }) => ({
    key: normalizeQueryAlias(slug),
    label: slug,
    node: 'line',
    queryKey: 'historicalBalance',
    reqMeta: {
      slug
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
