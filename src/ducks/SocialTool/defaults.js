import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { getSavedToggle } from '../../utils/localStorage'

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const DEFAULT_SETTINGS = {
  slug: 'bitcoin',
  ticker: 'BTC',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

export const DEFAULT_OPTIONS = {
  isLogScale: false,
  isMultiChartsActive: false,
  showMulti: false,
  hideCalendar: true,
  timeRanges: ['1W', '1M', '3M', '6M', '1Y'],
  withDominance: getSavedToggle('withDominance', true),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true)
}

export const DEFAULT_METRICS = [Metric.price_usd, Metric.social_volume_total]
