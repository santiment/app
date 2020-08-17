import { Metric } from '../../dataHub/metrics'
import { getTransformerKey } from '../../Studio/timeseries/hooks'

export const CHECKING_STABLECOINS = [
  {
    slug: 'tether',
    label: 'USDT',
    color: 'var(--jungle-green)'
  },
  {
    slug: 'binance-usd',
    label: 'BUSD',
    color: 'var(--persimmon)'
  },
  {
    slug: 'usd-coin',
    label: 'USDC',
    color: 'var(--texas-rose)'
  },
  {
    slug: 'trueusd',
    label: 'TUSD',
    color: 'var(--dodger-blue)'
  },
  {
    slug: 'gemini-dollar',
    label: 'GUSD',
    color: 'var(--lima-hover)'
  },
  {
    slug: undefined,
    label: 'Others',
    color: 'var(--waterloo)'
  }
]

export const STABLE_COINS_METRICS = CHECKING_STABLECOINS.map(item => {
  return {
    ...Metric.marketcap_usd,
    ...item,
    node: 'filledLine'
  }
})

export const METRIC_SETTINGS_MAP = new Map(
  STABLE_COINS_METRICS.map(metric => {
    return [
      metric,
      {
        slug: metric.slug,
        market_segments: ['Stablecoin'],
        ignored_slugs: ['dai', 'sai']
      }
    ]
  })
)

const METRIC_TRANSFORMER_TMP = {}

STABLE_COINS_METRICS.forEach(metric => {
  METRIC_TRANSFORMER_TMP[getTransformerKey(metric)] = v => {
    return v.map(item => ({
      datetime: item.datetime,
      [getTransformerKey(metric)]: item.marketcap_usd
    }))
  }
})

export const METRIC_TRANSFORMER = { ...METRIC_TRANSFORMER_TMP }
