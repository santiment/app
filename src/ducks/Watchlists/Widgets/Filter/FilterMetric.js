import React, { useState, useEffect } from 'react'
import {
  getFilterType,
  extractParams,
  getTimeRangesByMetric,
  extractFilterByMetricType
} from './detector'
import FilterMetricState from './FilterMetricState'
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

  // useEffect(
  //   () => {
  //     if () {
  //       updMetricInFilter({
  //         aggregation: 'last',
  //         dynamicFrom: settings.timeRange,
  //         dynamicTo: 'now',
  //         metric: settings.metricKey,
  //         operator: settings.operator,
  //         threshold: serverValueFormatter(props.threshold || firstInputValue)
  //       })
  //     }
  //   },
  //   [settings]
  // )

  function onCheckboxClicked () {
    setSettings(state => ({ ...state, isActive: !settings.isActive }))
  }

  function onFilterTypeChange (type) {
    setSettings(state => ({ ...state, type }))
  }

  function onFirstThresholdChange ({ currentTarget: { value } }) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setSettings(state => ({ ...state, firstThreshold: newValue }))
  }

  function onTimeRangeChange (timeRange) {
    setSettings(state => ({ ...state, timeRange }))
  }

  return (
    <>
      <FilterMetricState
        isAuthor={isAuthor}
        metric={baseMetric}
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
