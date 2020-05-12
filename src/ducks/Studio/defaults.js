import { Metric } from '../dataHub/metrics'
import { getNewInterval } from '../SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'
import { getSavedMulticharts, getSavedToggle } from '../../utils/localStorage'

const DEFAULT_TIME_RANGE = '6m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const DEFAULT_SETTINGS = {
  slug: 'bitcoin',
  projectId: 1505,
  ticker: 'BTC',
  title: 'Bitcoin (BTC)',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

export const DEFAULT_OPTIONS = {
  isLogScale: false,
  isICOPriceActive: true,
  isAnomalyActive: getSavedToggle('isAnomalyActive'),
  isMultiChartsActive: getSavedMulticharts(),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true),
  isClosestDataActive: getSavedToggle('isClosestDataActive', true)
}

export const DEFAULT_METRICS = [Metric.price_usd]

export const DEFAULT_METRIC_SETTINGS_MAP = new Map([
  [
    Metric.amount_in_top_holders,
    {
      holdersCount: 10
    }
  ],
  [
    Metric.amount_in_exchange_top_holders,
    {
      holdersCount: 10
    }
  ],
  [
    Metric.amount_in_non_exchange_top_holders,
    {
      holdersCount: 10
    }
  ]
])
