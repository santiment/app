import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { getSavedToggle } from '../../utils/localStorage'

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

TO.setUTCHours(0, 0, 0, 0)

export const DEFAULT_SETTINGS = {
  addedTopics: [],
  asset: 'bitcoin',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE,
  ticker: 'BTC'
}

export const DEFAULT_OPTIONS = {
  isSocialDominanceActive: getSavedToggle('isSocialDominanceActive'),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true)
}

export const DEFAULT_METRICS = [Metric.social_volume_total, Metric.price_usd]
