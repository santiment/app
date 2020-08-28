import memoize from 'lodash.memoize'
import { Metric } from '../../dataHub/metrics'
import { convertToSeconds } from '../../dataHub/metrics/intervals'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../../utils/dates'

export const StablecoinsMetrics = [
  Metric.marketcap_usd,
  Metric.price_usd,
  Metric.volume_usd
]

export const makeInterval = (val, label) => ({
  value: val,
  label: label
})

export const MARKET_CAP_MONTH_INTERVAL = makeInterval('31d', '1M')
export const MARKET_CAP_DAY_INTERVAL = makeInterval('2d', '1D')
export const MARKET_CAP_YEAR_INTERVAL = makeInterval('1y', '1Y')

export const STABLE_COINS_MARKETCAP_INTERVALS = [
  MARKET_CAP_DAY_INTERVAL,
  makeInterval('1w', '1W'),
  MARKET_CAP_MONTH_INTERVAL,
  makeInterval('90d', '3M'),
  MARKET_CAP_YEAR_INTERVAL
]

export const HOLDERS_DISTRIBUTION_6M = makeInterval('183d', '6m')

export const HOLDERS_DISTRIBUTION_MOBILE_INTERVALS = [
  makeInterval('1w', '1w'),
  makeInterval('31d', '1m'),
  makeInterval('93d', '3m'),
  HOLDERS_DISTRIBUTION_6M
]

export const CHECKING_STABLECOINS = [
  {
    slug: 'multi-collateral-dai',
    label: 'DAI',
    color: '#FFCB47'
  },
  {
    slug: 'tether',
    label: 'USDT',
    color: '#14C393'
  },
  {
    slug: 'binance-usd',
    label: 'BUSD',
    color: '#FF5B5B'
  },
  {
    slug: 'usd-coin',
    label: 'USDC',
    color: '#FFAD4D'
  },
  {
    slug: 'trueusd',
    label: 'TUSD',
    color: '#5275FF'
  },
  {
    slug: 'gemini-dollar',
    label: 'GUSD',
    color: '#1BAD44'
  },
  {
    label: 'Others',
    color: '#7A859E'
  }
]

export const REQ_META = {
  Others: {
    ignored_slugs: [
      'gemini-dollar',
      'trueusd',
      'usd-coin',
      'binance-usd',
      'tether',
      'multi-collateral-dai'
    ],
    market_segments: ['Stablecoin']
  }
}

export const getIntervalDates = memoize(interval => {
  return {
    from: new Date(new Date().getTime() + -1 * convertToSeconds(interval)),
    to: new Date()
  }
})

export const formStablecoinsSettings = intervalWrapper => {
  const { from, to } = getIntervalByTimeRange(intervalWrapper.value)

  const interval = getNewInterval(from, to)

  return {
    from,
    to,
    interval: INTERVAL_ALIAS[interval] || interval
  }
}
