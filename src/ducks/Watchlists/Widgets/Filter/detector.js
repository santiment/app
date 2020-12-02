import { Operator, Filter } from './dataHub/types'
import { DEFAULT_TIMERANGES } from './defaults'

export const isContainMetric = (item, key) =>
  item.includes(`${key}_change_`) || item === key

export function extractFilterByMetricType (filters = [], metric) {
  return filters
    .filter(item => {
      const filterMetric = item.name === 'metric' ? item.args.metric : item.name

      return (
        isContainMetric(filterMetric, metric.percentMetricKey) ||
        isContainMetric(filterMetric, metric.key)
      )
    })
    .map(({ args }) => ({ ...args }))
}

export function getFilterType (filter = [], metric) {
  if (filter.length === 0) {
    return metric.isOnlyPercentFilters ? Filter.percent_up : Filter.above
  }

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

  // 5 < x < 30
  if (!isPercent && operators[0] === Operator.inside) {
    return Filter.between
  }

  // x < 5 || x > 30
  if (!isPercent && operators[0] === Operator.outside) {
    return Filter.outside
  }

  // x +30%
  if (isPercent && operators[0] === Operator.more) {
    return Filter.percent_up
  }

  // x -30%
  if (isPercent && operators[0] === Operator.less) {
    return Filter.percent_down
  }

  // +5% < x < +30%
  if (isPercent && operators[0] === Operator.inside) {
    return Filter.percent_between
  }

  // x +-5%
  if (isPercent && operators[0] === Operator.outside) {
    return Filter.percent_up_or_down
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

export function extractParams (filter = [], filterType, baseMetric) {
  return filter.length === 0
    ? {}
    : {
      isActive: true,
      type: filterType.key,
      firstThreshold: extractThreshold(filter, filterType, baseMetric, 1),
      secondThreshold: extractThreshold(filter, filterType, baseMetric, 2),
      timeRange: extractTimeRange(filter)
    }
}

function extractTimeRange (filter = []) {
  return filter[0].dynamicFrom
}

function extractThreshold (filter = [], filterType, metric, position) {
  const thresholds = filter.map(({ threshold }) => threshold)
  const withSecondInput = filterType.showSecondInput
  const threshold = withSecondInput
    ? thresholds[0][position - 1]
    : thresholds[0]

  const formatter = filterType.valueFormatter || metric.valueFormatter

  return formatter ? formatter(threshold) : threshold
}

export function getTimeRangesByMetric (baseMetric, availableMetrics = []) {
  const metrics = availableMetrics.filter(metric =>
    metric.includes(`${baseMetric.percentMetricKey || baseMetric.key}_change_`)
  )
  const timeRanges = metrics.map(metric =>
    metric.replace(
      `${baseMetric.percentMetricKey || baseMetric.key}_change_`,
      ''
    )
  )

  return DEFAULT_TIMERANGES.filter(({ type }) => timeRanges.includes(type))
}
