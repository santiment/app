import {
  getBaseMetric,
  Metric,
  METRIC_PERCENT_SUFFIX
} from '../../Filter/dataHub/metrics'
import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import { DEFAULT_TIMERANGES } from '../../Filter/dataHub/timeranges'
import { defaultFormatter } from '../../Filter/formatters'
import { BASIC_CELL, PERCENT_CHANGES_CELL } from './columns'

const EMPTY_STR = ''

function formatterWithBadge (value, badge) {
  return `${badge}${defaultFormatter(value)}`
}

export function buildColumnsFromKey (baseMetricKey, availableMetrics = []) {
  const columnsObj = {}
  const baseMetric = Metric[baseMetricKey]
  const {
    percentMetricKey,
    key,
    label,
    shortLabel,
    aggregation,
    isOnlyPercentFilters
  } = baseMetric
  const keyWithSuffix = `${percentMetricKey || key}${METRIC_PERCENT_SUFFIX}`

  const percentMetricsKeys = availableMetrics.filter(metric => {
    if (metric.includes(keyWithSuffix)) {
      const timeRange = metric.replace(keyWithSuffix, EMPTY_STR)
      return DEFAULT_TIMERANGES.some(({ type }) => type === timeRange)
    } else return false
  })

  if (!isOnlyPercentFilters) {
    const {
      tableColumnFormatter,
      badge = '',
      defaultTimeRange = ''
    } = baseMetric
    const formatter =
      tableColumnFormatter || (value => formatterWithBadge(value, badge))
    const visualTimeRange = defaultTimeRange
      ? `, ${defaultTimeRange}`
      : EMPTY_STR

    columnsObj[baseMetricKey] = {
      ...baseMetric,
      accessor: baseMetricKey,
      Header: `${shortLabel || label}${visualTimeRange}`,
      label: `${label}${visualTimeRange}`,
      aggregation: aggregation || AGGREGATIONS_LOWER.LAST,
      timeRange: defaultTimeRange || '1d',
      sortDescFirst: true,
      Cell: ({ value }) => BASIC_CELL(value, formatter)
    }
  }

  percentMetricsKeys.forEach(key => {
    const timeRange = key.replace(keyWithSuffix, EMPTY_STR)
    columnsObj[key] = {
      ...baseMetric,
      key,
      accessor: key,
      Header: `${shortLabel || label}, ${timeRange} %`,
      label: `${label}, ${timeRange} %`,
      aggregation: AGGREGATIONS_LOWER.LAST,
      sortDescFirst: true,
      timeRange,
      Cell: PERCENT_CHANGES_CELL
    }
  })

  return columnsObj
}

export function buildActiveColumns (columnsKeys) {
  const columns = {}

  const baseKeys = new Set(
    columnsKeys.map(key => {
      const baseMetric = getBaseMetric(key)
      return baseMetric ? baseMetric.key : null
    })
  )

  baseKeys.delete(null)
  baseKeys.forEach(key => {
    Object.assign(columns, buildColumnsFromKey(key, columnsKeys))
  })

  return columns
}
