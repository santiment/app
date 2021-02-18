import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { getSavedToggle } from '../../utils/localStorage'
import { COMMON_CHART_OPTIONS } from '../Studio/defaults'

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

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
  ...COMMON_CHART_OPTIONS
}

export const DEFAULT_METRICS = [
  Metric.social_volume_total,
  Metric.price_usd,
  getSavedToggle('isSocialDominanceActive') && Metric.social_dominance_total
].filter(Boolean)
