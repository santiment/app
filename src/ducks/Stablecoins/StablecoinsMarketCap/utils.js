import { Metric } from '../../dataHub/metrics'
import { updateTooltipSettings } from '../../dataHub/tooltipSettings'
import { usdFormatter } from '../../dataHub/metrics/formatters'

export const STABLECOIN_MARKETCAP_USD_METRIC = {
  ...Metric.marketcap_usd,
  node: 'filledLine',
}

export const StablecoinsMetrics = [
  STABLECOIN_MARKETCAP_USD_METRIC,
  Metric.price_usd,
  Metric.volume_usd,
]

export const makeInterval = (val, label) => ({
  value: val,
  label: label,
})

export const MARKET_CAP_MONTH_INTERVAL = makeInterval('31d', '1M')
export const MARKET_CAP_DAY_INTERVAL = makeInterval('2d', '1D')
export const MARKET_CAP_YEAR_INTERVAL = makeInterval('1y', '1Y')

export const STABLE_COINS_MARKETCAP_INTERVALS = [
  MARKET_CAP_DAY_INTERVAL,
  makeInterval('1w', '1W'),
  MARKET_CAP_MONTH_INTERVAL,
  makeInterval('90d', '3M'),
  MARKET_CAP_YEAR_INTERVAL,
]

export const HOLDERS_DISTRIBUTION_6M = makeInterval('183d', '6m')

export const HOLDERS_DISTRIBUTION_MOBILE_INTERVALS = [
  makeInterval('1w', '1w'),
  makeInterval('31d', '1m'),
  makeInterval('93d', '3m'),
  HOLDERS_DISTRIBUTION_6M,
]

export const CHECKING_STABLECOINS = [
  {
    slug: 'multi-collateral-dai',
    label: 'DAI',
    color: '#FFCB47',
  },
  {
    slug: 'tether',
    label: 'USDT',
    color: '#14C393',
  },
  {
    slug: 'binance-usd',
    label: 'BUSD',
    color: '#FF5B5B',
  },
  {
    slug: 'usd-coin',
    label: 'USDC',
    color: '#FFAD4D',
  },
  {
    slug: 'trueusd',
    label: 'TUSD',
    color: '#5275FF',
  },
  {
    slug: 'gemini-dollar',
    label: 'GUSD',
    color: '#1BAD44',
  },
  {
    slug: 'TOTAL_MARKET',
    label: 'TOTAL_MARKET',
    color: '#7A859E',
  },
  {
    slug: 'bitcoin',
    label: 'BTC',
    color: '#7A859E',
  },
]

CHECKING_STABLECOINS.forEach((metric) => {
  const { slug, label, market_segments, ignored_slugs } = metric
  metric.key = label
  metric.formatter = usdFormatter
  metric.reqMeta = {
    slug,
    market_segments,
    ignored_slugs,
  }
})

updateTooltipSettings(CHECKING_STABLECOINS)

export const StablecoinColor = CHECKING_STABLECOINS.reduce((acc, { label, color }) => {
  acc[label] = color
  return acc
}, {})
