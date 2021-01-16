import React from 'react'
import { Metric, METRIC_PERCENT_SUFFIX } from '../../Filter/dataHub/metrics'
import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import {
  defaultFormatter,
  percentValueFormatter
} from '../../Filter/formatters'
import PercentChanges from '../../../../../components/PercentChanges'
import { isValid, NO_DATA } from './columns'

const EMPTY_STR = ''

export function buildColumnsFromMetricKey (
  baseMetricKey,
  availableMetrics = []
) {
  const columns = []
  const baseMetric = Metric[baseMetricKey]
  const baseMetricKeyWithSuffix = `${baseMetric.percentMetricKey ||
    baseMetric.key}${METRIC_PERCENT_SUFFIX}`
  const percentMetricsKeys = availableMetrics.filter(metric =>
    metric.includes(baseMetricKeyWithSuffix)
  )
  const label = baseMetric.shortLabel || baseMetric.label

  if (!baseMetric.isOnlyPercentFilters) {
    const { badge = '', defaultTimeRange = '' } = baseMetric
    const formatter =
      baseMetric.tableColumnFormatter ||
      (value => `${badge}${defaultFormatter(value)}`)
    const baseMetricColumn = {
      accessor: baseMetric.key,
      Header: `${label}${defaultTimeRange ? `, ${defaultTimeRange}` : ''}`,
      aggregation: baseMetric.aggregation || AGGREGATIONS_LOWER.LAST,
      timeRange: defaultTimeRange || '1d',
      Cell: ({ value }) => (isValid(value) ? formatter(value) : NO_DATA)
    }

    columns.push(baseMetricColumn)
  }

  percentMetricsKeys.forEach(key => {
    const timeRange = key.replace(baseMetricKeyWithSuffix, EMPTY_STR)
    const column = {
      accessor: key,
      Header: `${label}, ${timeRange} %`,
      aggregation: AGGREGATIONS_LOWER.LAST,
      timeRange,
      Cell: ({ value }) =>
        isValid(value) ? (
          <PercentChanges changes={percentValueFormatter(value)} />
        ) : (
          NO_DATA
        )
    }

    columns.push(column)
  })

  return columns
}

export function collectActiveDynamicColumns (activeDynamicColumnsKeys) {
  const dynamicColumns = []
  const baseKeys = activeDynamicColumnsKeys.filter(key => !!Metric[key])
  baseKeys.forEach(key =>
    dynamicColumns.push(
      ...buildColumnsFromMetricKey(key, activeDynamicColumnsKeys)
    )
  )

  return dynamicColumns
}
