import { getBaseMetric, Metric } from '../../Filter/dataHub/metrics'
import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import { DEFAULT_TIMERANGES } from '../../Filter/dataHub/timeranges'
import { formatterWithBadge } from '../../Filter/formatters'
import { BASIC_CELL, PERCENT_CHANGES_CELL } from './columns'

const EMPTY_STR = ''
const PERCENT_SUFFIX = '_change_'
const LAST_AGG = AGGREGATIONS_LOWER.LAST

export const Column = {}

export function buildColumnsFromKey (baseMetricKey, availableMetrics = []) {
  const baseMetric = Metric[baseMetricKey]
  const {
    key,
    percentMetricKey = key,
    label,
    shortLabel = label,
    isStatic,
    isOnlyPercentFilters,
    aggregation = LAST_AGG
  } = baseMetric
  const keyWithSuffix = `${percentMetricKey}${PERCENT_SUFFIX}`
  const percentMetricsKeys = availableMetrics.filter(metric => {
    if (metric.includes(keyWithSuffix)) {
      const timeRange = metric.replace(keyWithSuffix, EMPTY_STR)
      return DEFAULT_TIMERANGES.some(({ type }) => type === timeRange)
    } else return false
  })

  if (!isOnlyPercentFilters) {
    if (isStatic) {
      Column[key] = { ...baseMetric, disableSortBy: true, Header: label }
    } else {
      const { badge, defaultTimeRange = '' } = baseMetric
      const visualTimeRange = defaultTimeRange ? `, ${defaultTimeRange}` : ''
      const formatter =
        baseMetric.tableColumnFormatter || formatterWithBadge(badge)

      Column[key] = {
        ...baseMetric,
        aggregation,
        sortDescFirst: true,
        accessor: baseMetricKey,
        Cell: BASIC_CELL(formatter),
        timeRange: defaultTimeRange || '1d',
        label: `${label}${visualTimeRange}`,
        Header: `${shortLabel}${visualTimeRange}`
      }
    }
  }

  percentMetricsKeys.forEach(key => {
    const timeRange = key.replace(keyWithSuffix, EMPTY_STR)
    Column[key] = {
      ...baseMetric,
      key,
      timeRange,
      accessor: key,
      sortDescFirst: true,
      aggregation: LAST_AGG,
      Cell: PERCENT_CHANGES_CELL,
      label: `${label}, ${timeRange} %`,
      Header: `${shortLabel}, ${timeRange} %`
    }
  })
}

export const buildColumns = (columnsKeys, availableMetrics = columnsKeys) =>
  columnsKeys.map(key => {
    const column = Column[key]
    if (column) {
      return column
    } else {
      const baseMetric = getBaseMetric(key)
      buildColumnsFromKey(baseMetric.key, availableMetrics)
      return Column[key]
    }
  })
