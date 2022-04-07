import React, { useState, useEffect } from 'react'
import { getFilterType, extractParams, extractFilterByMetricType } from '../detector'
import MetricState from './MetricState'
import { Filter } from '../dataHub/types'
import { useMetricSettings } from './hooks'
import MetricSettings from './MetricSettings'
import { DEFAULT_SETTINGS } from '../defaults'
import { getTimeRangesByMetric } from '../dataHub/metrics'

function fakeFormatter (value) {
  return value
}

const FilterMetric = ({
  baseMetric,
  isNoFilters,
  defaultSettings,
  updMetricInFilter,
  isViewMode,
  availableMetrics,
  toggleMetricInFilter,
  isPro,
}) => {
  if (!defaultSettings.isActive && baseMetric.isDeprecated) {
    return null
  }

  const { settings, setSettings, selectSuggest, clickCheckbox } = useMetricSettings(defaultSettings)
  const [percentTimeRanges, setPercentTimeRanges] = useState(
    getTimeRangesByMetric(baseMetric, availableMetrics),
  )

  const shouldIncludeSecondInput = Filter[settings.type].showSecondInput
  const isFinishedState = shouldIncludeSecondInput
    ? settings.firstThreshold !== '' && settings.secondThreshold !== ''
    : settings.firstThreshold !== ''

  useEffect(() => {
    if (isNoFilters) {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [isNoFilters])

  useEffect(() => {
    if (percentTimeRanges.length === 0) {
      const timeRanges = getTimeRangesByMetric(baseMetric, availableMetrics)
      setPercentTimeRanges(timeRanges)

      if (
        Filter[settings.type].showTimeRange &&
        !timeRanges.some((item) => item.type === settings.timeRange) &&
        timeRanges[0]
      ) {
        setSettings((state) => ({ ...state, timeRange: timeRanges[0].type }))
      }
    }
  }, [availableMetrics])

  useEffect(() => {
    if (settings !== defaultSettings) {
      const { firstThreshold, secondThreshold, type, timeRange, isActive } = settings
      const { isActive: previousIsActive } = defaultSettings

      // dynamicFrom
      const dynamicFrom = Filter[type].showTimeRange || baseMetric.showTimeRange ? timeRange : '1d'

      // aggregation
      const aggregation = Filter[type].aggregation || baseMetric.aggregation || 'last'

      // metric
      const metric = Filter[type].showTimeRange
        ? `${baseMetric.percentMetricKey || baseMetric.key}_change_${timeRange}`
        : baseMetric.key

      // operator
      const operator = Filter[type].operator

      // formatter
      const formatter =
        Filter[type].serverValueFormatter || baseMetric.serverValueFormatter || fakeFormatter

      // threshold
      const threshold = shouldIncludeSecondInput
        ? [formatter(firstThreshold), formatter(secondThreshold)]
        : formatter(firstThreshold)

      const newFilter = {
        args: {
          aggregation,
          dynamicFrom,
          dynamicTo: 'now',
          metric,
          operator,
          threshold,
        },
        name: 'metric',
      }

      if (isFinishedState) {
        if (previousIsActive !== isActive) {
          toggleMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey)
        } else {
          updMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey)
        }
      }

      if (!isFinishedState && isActive && defaultSettings.isActive) {
        toggleMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey)
      }
    }
  }, [settings])

  function onFilterTypeChange (type) {
    if (
      Filter[type].showTimeRange &&
      !percentTimeRanges.some((item) => item.type === settings.timeRange) &&
      percentTimeRanges[0]
    ) {
      setSettings((state) => ({
        ...state,
        type,
        timeRange: percentTimeRanges[0].type,
      }))
    } else {
      setSettings((state) => ({ ...state, type }))
    }
  }

  function onFirstThresholdChange (value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setSettings((state) => ({ ...state, firstThreshold: newValue }))
  }

  function onSecondThresholdChange (value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setSettings((state) => ({ ...state, secondThreshold: newValue }))
  }

  function onTimeRangeChange (timeRange) {
    setSettings((state) => ({ ...state, timeRange }))
  }

  return (
    <>
      <MetricState
        isViewMode={isViewMode}
        isPro={isPro}
        metric={baseMetric}
        settings={settings}
        isActive={settings.isActive}
        onCheckboxClicked={clickCheckbox}
        isFinishedState={isFinishedState}
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
          onSecondThresholdChange={onSecondThresholdChange}
          onSuggestionClick={selectSuggest}
        />
      )}
    </>
  )
}

export default ({ filters, baseMetric, ...props }) => {
  const filter = extractFilterByMetricType(filters, baseMetric)
  const filterType = getFilterType(filter, baseMetric)
  const settings = extractParams(filter, filterType, baseMetric)

  return (
    <FilterMetric
      {...props}
      baseMetric={baseMetric}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        timeRange: baseMetric.defaultTimeRange || DEFAULT_SETTINGS.timeRange,
        ...settings,
        type: filterType.key,
      }}
    />
  )
}
