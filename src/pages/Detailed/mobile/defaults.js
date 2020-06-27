import { Metric } from '../../../ducks/dataHub/metrics'
import { getNewInterval } from '../../../ducks/SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../../utils/dates'

const DEFAULT_TIME_RANGE = '6m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

const PriceMobileStyles = {
  node: 'area',
  gradientUrl: 'url(#totalUp)',
  hideYAxis: true
}

export const PriceMetric = { ...Metric.price_usd, ...PriceMobileStyles }

export const MAX_METRICS_PER_CHART = 3

export const DEFAULT_SETTINGS = {
  interval: getNewInterval(FROM, TO, '1d', { isMobile: true }),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

export const POPULAR_METRICS = [
  Metric.daily_active_addresses,
  Metric.dev_activity,
  Metric.social_volume_total
]
