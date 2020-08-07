import React, { useState, useEffect } from 'react'
import {
  getFilterType,
  extractParams,
  getTimeRangesByMetric,
  extractFilterByMetricType
} from '../detector'
import { Filter } from '../dataHub/types'
import MetricState from './MetricState'
import MetricSettings from './MetricSettings'
import { DEFAULT_SETTINGS } from '../defaults'

const FilterMetric = ({
  baseMetric,
  isNoFilters,
  defaultSettings,
  updMetricInFilter,
  isViewMode,
  availableMetrics,
  toggleMetricInFilter,
  isPro
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [percentTimeRanges, setPercentTimeRanges] = useState(
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
      if (percentTimeRanges.length === 0) {
        const timeRanges = getTimeRangesByMetric(baseMetric, availableMetrics)
        setPercentTimeRanges(timeRanges)

        if (
          Filter[settings.type].showTimeRange &&
          !timeRanges.some(item => item.type === settings.timeRange) &&
          timeRanges[0]
        ) {
          setSettings(state => ({ ...state, timeRange: timeRanges[0].type }))
        }
      }
    },
    [availableMetrics]
  )

  useEffect(
    () => {
      if (settings !== defaultSettings) {
        const { firstThreshold, type, timeRange, isActive } = settings
        const { isActive: previousIsActive } = defaultSettings

        const dynamicFrom =
          Filter[type].showTimeRange || baseMetric.showTimeRange
            ? timeRange
            : '1d'
        const aggregation =
          Filter[type].aggregation || baseMetric.aggregation || 'last'
        const metric = Filter[type].showTimeRange
          ? `${baseMetric.percentMetricKey ||
              baseMetric.key}_change_${timeRange}`
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
            toggleMetricInFilter(
              newFilter,
              baseMetric.key,
              baseMetric.percentMetricKey
            )
          } else {
            updMetricInFilter(
              newFilter,
              baseMetric.key,
              baseMetric.percentMetricKey
            )
          }
        }

        if (!firstThreshold && isActive && defaultSettings.isActive) {
          toggleMetricInFilter(
            newFilter,
            baseMetric.key,
            baseMetric.percentMetricKey
          )
        }
      }
    },
    [settings]
  )

  function onCheckboxClicked () {
    setSettings(state => ({ ...state, isActive: !settings.isActive }))
  }

  function onFilterTypeChange (type) {
    if (
      Filter[type].showTimeRange &&
      !percentTimeRanges.some(item => item.type === settings.timeRange) &&
      percentTimeRanges[0]
    ) {
      setSettings(state => ({
        ...state,
        type,
        timeRange: percentTimeRanges[0].type
      }))
    } else {
      setSettings(state => ({ ...state, type }))
    }
  }

  function onFirstThresholdChange (value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setSettings(state => ({ ...state, firstThreshold: newValue }))
  }

  function onTimeRangeChange (timeRange) {
    setSettings(state => ({ ...state, timeRange }))
  }

  function onSuggestionClick (props) {
    setSettings(state => ({ ...state, ...props }))
  }

  return (
    <>
      <MetricState
        isViewMode={isViewMode}
        metric={baseMetric}
        settings={settings}
        isActive={settings.isActive}
        onCheckboxClicked={onCheckboxClicked}
      />
      {settings.isActive && !isViewMode && (
        <MetricSettings
          isPro={isPro}
          metric={baseMetric}
          settings={settings}
          autoFocus={settings.isActive && !defaultSettings.isActive}
          percentTimeRanges={percentTimeRanges}
          onFilterTypeChange={onFilterTypeChange}
          onTimeRangeChange={onTimeRangeChange}
          onFirstThresholdChange={onFirstThresholdChange}
          onSuggestionClick={onSuggestionClick}
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
        timeRange: baseMetric.defaultTimeRange || DEFAULT_SETTINGS.timeRange,
        ...settings,
        type: filterType.key
      }}
    />
  )
}
