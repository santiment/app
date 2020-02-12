import { getIntervalByTimeRange } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'
import { Metrics } from '../../ducks/SANCharts/data'
import { getSavedToggle } from '../../utils/localStorage'

const DEFAULT_TIME_RANGE = '6m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const DEFAULT_SETTINGS = {
  slug: 'bitcoin',
  projectId: 1505,
  title: 'Bitcoin (BTC)',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

export const DEFAULT_OPTIONS = {
  isLogScale: false,
  isAnomalyActive: getSavedToggle('isAnomalyActive'),
  isMultiChartsActive: getSavedToggle('isMultiChartsActive'),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive')
}

export const DEFAULT_METRICS = [Metrics.historyPrice]
