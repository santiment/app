import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { getSavedToggle } from '../../utils/localStorage'

const DEFAULT_TIME_RANGE = '3m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const DEFAULT_SETTINGS = {
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE,
  asset: 'bitcoin',
  ticker: 'BTC',
  detailed_charts: [
    'social_volume_telegram',
    'social_volume_reddit',
    'social_volume_professional_traders_chat',
    'social_volume_discord',
    'community_messages_count_telegram'
  ]
}

export const DEFAULT_OPTIONS = {
  isSocialDominanceActive: getSavedToggle('isSocialDominanceActive'),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true)
}

export const DEFAULT_METRICS = [Metric.social_volume_total, Metric.price_usd]
