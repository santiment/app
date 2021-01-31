import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import { formatterWithBadge } from '../../Filter/formatters'
import { BASIC_CELL, PERCENT_CHANGES_CELL, PRO_CELL } from './columns'

const EMPTY_STR = ''
const PERCENT_SUFFIX = '_change_'
const LAST_AGG = AGGREGATIONS_LOWER.LAST
const TIMERANGES = new Set(['1d', '7d', '30d', '90d', '180d', '365d'])

export const Column = {}
const sortByTimeRanges = (a, b) => parseInt(a.timeRange) - parseInt(b.timeRange)

export const buildColumns = (baseMetrics, allMetrics, restrictedMetrics) => {
  const allMetricsSet = new Set(allMetrics)
  const restrictedMetricsSet = new Set(restrictedMetrics)

  baseMetrics.forEach(baseMetric => {
    if (baseMetric.isDeprecated) {
      return
    }

    const { key, label, isStatic, isOnlyPercentFilters } = baseMetric

    if (isStatic) {
      Column[key] = { ...baseMetric, disableSortBy: true, Header: label }
      return
    }
    const {
      shortLabel = label,
      percentMetricKey = key,
      category,
      group
    } = baseMetric

    if (!isOnlyPercentFilters) {
      const {
        badge,
        defaultTimeRange,
        tableColumnFormatter,
        aggregation = LAST_AGG
      } = baseMetric
      const visualTimeRange = defaultTimeRange ? `, ${defaultTimeRange}` : ''
      const formatter = tableColumnFormatter || formatterWithBadge(badge)
      const isRestricted = restrictedMetricsSet.has(key)

      Column[key] = {
        key,
        group,
        category,
        shortLabel,
        aggregation,
        isRestricted,
        accessor: key,
        sortDescFirst: true,
        Cell: isRestricted ? PRO_CELL : BASIC_CELL(formatter),
        disableSortBy: isRestricted,
        timeRange: defaultTimeRange || '1d',
        label: `${label}${visualTimeRange}`,
        Header: `${shortLabel}${visualTimeRange}`
      }
    }

    const keyWithSuffix = `${percentMetricKey}${PERCENT_SUFFIX}`
    const percentMetrics = []

    allMetricsSet.forEach(key => {
      const timeRange = key.replace(keyWithSuffix, EMPTY_STR)
      if (timeRange !== key && TIMERANGES.has(timeRange)) {
        const isRestricted = restrictedMetricsSet.has(key)

        percentMetrics.push({
          key,
          group,
          category,
          timeRange,
          shortLabel,
          isRestricted,
          accessor: key,
          sortDescFirst: true,
          aggregation: LAST_AGG,
          Cell: isRestricted ? PRO_CELL : PERCENT_CHANGES_CELL,
          disableSortBy: isRestricted,
          label: `${label}, ${timeRange} %`,
          Header: `${shortLabel}, ${timeRange} %`
        })
      }
    })

    percentMetrics
      .sort(sortByTimeRanges)
      .forEach(item => (Column[item.key] = item))
  })
}

export const getColumns = columnsKeys => columnsKeys.map(key => Column[key])
