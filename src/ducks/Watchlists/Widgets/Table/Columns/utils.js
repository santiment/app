import React from 'react'
import {
  getBaseMetric,
  Metric,
  METRIC_PERCENT_SUFFIX
} from '../../Filter/dataHub/metrics'
import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'
import {
  defaultFormatter,
  percentValueFormatter
} from '../../Filter/formatters'
import PercentChanges from '../../../../../components/PercentChanges'
import { isValid, NO_DATA } from './columns'

const EMPTY_STR = ''
const EMPTY_OBJ = {}

export function buildColumnsFromMetricKey (
  baseMetricKey,
  availableMetrics = []
) {
  const columnsObj = {}
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
    columnsObj[baseMetricKey] = {
      accessor: baseMetricKey,
      Header: `${label}${defaultTimeRange ? `, ${defaultTimeRange}` : ''}`,
      aggregation: baseMetric.aggregation || AGGREGATIONS_LOWER.LAST,
      timeRange: defaultTimeRange || '1d',
      Cell: ({ value }) => (isValid(value) ? formatter(value) : NO_DATA)
    }
  }

  percentMetricsKeys.forEach(key => {
    const timeRange = key.replace(baseMetricKeyWithSuffix, EMPTY_STR)
    columnsObj[key] = {
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
  })

  return columnsObj
}

export function collectActiveDynamicColumns (activeDynamicColumnsKeys) {
  const dynamicColumns = {}
  const baseKeys = new Set(
    activeDynamicColumnsKeys.map(key => {
      const { key: baseKey } = getBaseMetric(key) || EMPTY_OBJ
      return baseKey
    })
  )
  baseKeys.forEach(key => {
    if (key) {
      Object.assign(
        dynamicColumns,
        buildColumnsFromMetricKey(key, activeDynamicColumnsKeys)
      )
    }
  })

  return dynamicColumns
}
