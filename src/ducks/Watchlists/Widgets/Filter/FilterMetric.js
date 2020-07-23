import React, { useState, useEffect } from 'react'
import {
  getFilterType,
  extractParams,
  getTimeRangesByMetric,
  extractFilterByMetricType
} from './detector'
import { Filter } from './types'
import MetricState from './MetricState'
import MetricSettings from './MetricSettings'
import { DEFAULT_SETTINGS } from './defaults'

const FilterMetric = ({
  baseMetric,
  isNoFilters,
  defaultSettings,
  updMetricInFilter,
  isAuthor,
  availableMetrics,
  toggleMetricInFilter,
  isPro
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [timeRanges, setTimeRanges] = useState(
    getTimeRangesByMetric(baseMetric, availableMetrics)
  )

  useEffect(
    () => {
      if (isNoFilters) {
        setSettings(DEFAULT_SETTINGS)
      }
    },
    [isNoFilters]
  )

  useEffect(
    () => {
      if (timeRanges.length === 0) {
        const timeRanges = getTimeRangesByMetric(baseMetric, availableMetrics)
        setTimeRanges(timeRanges)
      }
    },
    [availableMetrics]
  )

  useEffect(
    () => {
      if (settings !== defaultSettings) {
        const { firstThreshold, type, timeRange, isActive } = settings
        const { isActive: previousIsActive } = defaultSettings

        const dynamicFrom = Filter[type].showTimeRange ? timeRange : '1d'
        const aggregation =
          Filter[type].aggregation || baseMetric.aggregation || 'last'
        const metric = Filter[type].showTimeRange
          ? `${baseMetric.key}_change_${timeRange}`
          : baseMetric.key
        const operator = Filter[type].operator
        const formatter = Filter[type].serverValueFormatter

        const newFilter = {
          aggregation,
          dynamicFrom,
          dynamicTo: 'now',
          metric,
          operator,
          threshold: formatter ? formatter(firstThreshold) : firstThreshold
        }

        if (firstThreshold) {
          if (previousIsActive !== isActive) {
            toggleMetricInFilter(newFilter)
          } else {
            updMetricInFilter(newFilter)
          }
        }

        if (!firstThreshold && isActive && defaultSettings.isActive) {
          toggleMetricInFilter(newFilter)
        }
      }
    },
    [settings]
  )

  function onCheckboxClicked () {
    setSettings(state => ({ ...state, isActive: !settings.isActive }))
  }

  function onFilterTypeChange (type) {
    setSettings(state => ({ ...state, type }))
  }

  function onFirstThresholdChange (value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setSettings(state => ({ ...state, firstThreshold: newValue }))
  }

  function onTimeRangeChange (timeRange) {
    setSettings(state => ({ ...state, timeRange }))
  }

  return (
    <>
      <MetricState
        isAuthor={isAuthor}
        metric={baseMetric}
        settings={settings}
        isActive={settings.isActive}
        onCheckboxClicked={onCheckboxClicked}
      />
      {settings.isActive && isAuthor && (
        <MetricSettings
          isPro={isPro}
          metric={baseMetric}
          settings={settings}
          timeRanges={timeRanges}
          onFilterTypeChange={onFilterTypeChange}
          onTimeRangeChange={onTimeRangeChange}
          onFirstThresholdChange={onFirstThresholdChange}
        />
      )}
    </>
  )
}

export default ({ filters, baseMetric, ...props }) => {
  const filter = extractFilterByMetricType(filters, baseMetric)
  const filterType = getFilterType(filter)
  const settings = extractParams(filter, filterType, baseMetric)

  return (
    <FilterMetric
      {...props}
      baseMetric={baseMetric}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings,
        type: filterType.key
      }}
    />
  )
}
