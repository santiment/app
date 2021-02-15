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

export const COMMON_CHART_OPTIONS = {
  isWatermarkLighter: getSavedToggle('isWatermarkLighter', false),
  showWatermark: getSavedToggle('showWatermark', true),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true)
}

export const DEFAULT_OPTIONS = {
  isLogScale: false,
  isICOPriceActive: false,
  isAnomalyActive: getSavedToggle('isAnomalyActive'),
  isMultiChartsActive: getSavedMulticharts(),
  isClosestDataActive: getSavedToggle('isClosestDataActive', true),
  ...COMMON_CHART_OPTIONS
}
