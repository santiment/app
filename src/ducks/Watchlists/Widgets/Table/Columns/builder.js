import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import { formatterWithBadge } from '../../Filter/formatters'
import {
  BASIC_CELL,
  CHART_LINE_CELL,
  PERCENT_CHANGES_CELL,
  PRO_CELL
} from './columns'
import {
  CATEGORIES,
  CURRENT_BALANCE_CELL,
  LABELS_COLUMN,
  NOTE_COLUMN
} from '../../../../WatchlistAddressesTable/columns'
import { BLOCKCHAIN_ADDRESS } from '../../../detector'

const EMPTY_STR = ''
const PERCENT_SUFFIX = '_change_'
const LAST_AGG = AGGREGATIONS_LOWER.LAST
const TIMERANGES = new Set(['1d', '7d', '30d', '90d', '180d', '365d'])

export const Column = {}
export const AddressColumn = {
  labels: LABELS_COLUMN,
  notes: NOTE_COLUMN
}

const sortByTimeRanges = (a, b) => parseInt(a.timeRange) - parseInt(b.timeRange)

export const buildAssetColumns = projects => {
  return projects.map(({ ticker, name, slug }) => {
    const column = {
      title: `Current ${ticker} balance`,
      key: slug,
      label: `Current ${ticker} balance`,
      shortLabel: `${name} ${slug}`, // for search
      render: CURRENT_BALANCE_CELL(slug),
      category: CATEGORIES.ASSET
    }

    AddressColumn[slug] = column
    return column
  })
}

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
        withChart,
        defaultTimeRange,
        valueFormatter,
        tableColumnFormatter,
        aggregation = LAST_AGG
      } = baseMetric
      const visualTimeRange = defaultTimeRange ? `, ${defaultTimeRange}` : ''
      const formatter =
        tableColumnFormatter || formatterWithBadge(badge, valueFormatter)
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

      if (withChart) {
        const chartKey = `${key}_chart_7d`

        Column[chartKey] = {
          key: chartKey,
          group,
          category,
          shortLabel,
          isChart: true,
          accessor: chartKey,
          disableSortBy: true,
          Cell: CHART_LINE_CELL,
          label: `${label} chart, 7d`,
          Header: `${shortLabel} chart, 7d`
        }
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

export const getColumns = (columnsKeys, type) =>
  columnsKeys
    .map(key =>
      type === BLOCKCHAIN_ADDRESS ? AddressColumn[key] : Column[key]
    )
    .filter(Boolean)
