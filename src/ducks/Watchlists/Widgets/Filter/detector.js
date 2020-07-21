import { Combinator, Operator, Filter, DEFAULT_TIMERANGES } from './types'
import { Metric } from './metrics'

export function extractFilterByMetricType (filters = [], metric) {
  return filters.filter(item => item.metric.includes(metric.key))
}

export function getFilterType (filter = []) {
  if (filter.length === 0) {
    return Filter.above
  }

  // const isRange = checkIsRange(filter)
  const isPercent = checkIsPercentMetric(filter)
  const operators = filter.map(({ operator }) => operator)

  // x > 30
  if (!isPercent && operators[0] === Operator.more) {
    return Filter.above
  }

  // x < 30
  if (!isPercent && operators[0] === Operator.less) {
    return Filter.below
  }

  // x +30%
  if (isPercent && operators[0] === Operator.more) {
    return Filter.percent_up
  }

  // x -30%
  if (isPercent && operators[0] === Operator.less) {
    return Filter.percent_down
  }
}

function checkIsPercentMetric (filter = []) {
  const { length: totalNumber } = filter
  const { length: percentMetricsNumber } = filter.filter(({ metric }) =>
    metric.includes('_change_')
  )

  if (percentMetricsNumber !== 0 && totalNumber === percentMetricsNumber) {
    return true
  }

  if (percentMetricsNumber === 0) {
    return false
  }

  console.error(
    `Error in ${
      filter[0].metric
    } type: ${totalNumber} metrics and ${percentMetricsNumber} with percent type`
  )
}

export function getDefaultParams (baseMetric) {
  const defaultFilterType = Filter.above

  return {
    isActive: false,
    metricKey: baseMetric.key,
    operator: defaultFilterType.key,
    firstThreshold: '',
    // secondThreshold: '',
    timeRange: DEFAULT_TIMERANGES[0]
  }
}

export function extractParams (filter = [], filterType, baseMetric) {
  return {
    isActive: true,
    metricKey: extractMetricKey(filter),
    operator: filterType.key,
    firstThreshold: extractThreshold(filter, filterType),
    // secondThreshold,
    timeRange: extractTimeRange(filter)
  }
}

function extractMetricKey (filter = []) {
  return filter[0].metric
}

function extractTimeRange (filter = []) {
  return filter[0].dynamicFrom
}

function extractThreshold (filter = [], filterType) {
  const thresholds = filter.map(({ threshold }) => threshold)

  if (isNaN(thresholds[0])) {
    console.error(
      `Error in metric threshold: for ${
        filter[0].metric
      } metric got invalid threshold`
    )
  }

  const formatter = filterType.valueFormatter

  return formatter ? formatter(thresholds[0]) : thresholds[0]
}

export function getTimeRangesByMetric (baseMetric, availableMetrics = []) {
  const metrics = availableMetrics.filter(metric =>
    metric.includes(`${baseMetric.key}_change_`)
  )
  const timeRanges = metrics.map(metric =>
    metric.replace(`${baseMetric.key}_change_`, '')
  )

  return DEFAULT_TIMERANGES.filter(timeRange => timeRanges.includes(timeRange))
}

// function checkIsRange(filter = []) {
// 	const combinator = filter.filtersCombinator
//
// 	if (filter.length == 2 && Combinator[combinator] !== undefined) {
// 		return true
// 	}
//
// 	if (filter.length === 1 && Combinator[combinator] === undefined) {
// 		return false
// 	}
//
// 	console.error(`Error in ${filter.metric} combination: ${filter.length} args with ${Combinator[combinator]} combinator`)
// }
