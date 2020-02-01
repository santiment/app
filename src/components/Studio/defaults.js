import { getIntervalByTimeRange, parseIntervalString } from '../../utils/dates'
import { getNewInterval } from '../../ducks/SANCharts/IntervalSelector'
import { Metrics } from '../../ducks/SANCharts/data'

const DEFAULT_TIME_RANGE = '6m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

export const DEFAULT_SETTINGS = {
  slug: 'santiment',
  projectId: '16912',
  title: 'Santiment (SAN)',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
}

export const DEFAULT_OPTIONS = {
  isLogScale: false,
  isAdvancedView: false,
  isAnomalyActive: !localStorage.getItem('hideAnomalies'),
  /* isMultiChartsActive: true, */
  isMultiChartsActive: false
}

export const DEFAULT_METRICS = [Metrics.historyPrice]
