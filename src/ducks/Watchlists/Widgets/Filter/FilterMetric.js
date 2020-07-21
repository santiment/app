import React, { useState, useEffect } from 'react'
import {
  getFilterType,
  extractParams,
  getDefaultParams,
  getTimeRangesByMetric,
  extractFilterByMetricType
} from './detector'
import FilterMetricState from './FilterMetricState'
import FilterMetricSettings from './FilterMetricSettings'
import { useDebounce } from '../../../../hooks'

const FilterMetric = ({
  baseMetric,
  filters = [],
  isNoFilters,
  updMetricInFilter,
  isAuthor,
  availableMetrics,
  toggleMetricInFilter
}) => {
  const filter = extractFilterByMetricType(filters, baseMetric)
  const filterType = getFilterType(filter)
  const params =
    filter.length === 0
      ? getDefaultParams(baseMetric)
      : extractParams(filter, filterType, baseMetric)

  const [isActive, setIsActive] = useState(params.isActive)
  const [metricKey, setMetricKey] = useState(params.metricKey)
  const [timeRange, setTimeRange] = useState(params.timeRange)
  const [operator, setOperator] = useState(params.operator)
  const [firstThreshold, setFirstThreshold] = useState(params.firstThreshold)
  const [timeRanges, setTimeRanges] = useState(
    getTimeRangesByMetric(baseMetric, availableMetrics)
  )

  // const onMetricUpdateDebounced = useDebounce(
  //   value => onMetricUpdate(value),
  //   800
  // )

  useEffect(
    () => {
      if (isNoFilters) {
        const defaults = getDefaultParams(baseMetric)

        setIsActive(defaults.isActive)
        setFirstThreshold(defaults.firstThreshold)
        setTimeRange(defaults.timeRange)
        setMetricKey(defaults.metricKey)
        setOperator(defaults.operator)
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

  function onCheckboxClicked () {
    // const serverValueFormatter =
    //   Operator[operator].serverValueFormatter || defaultValueFormatter

    setIsActive(!isActive)
    // if (firstInputValue) {
    //   toggleMetricInFilter({
    //     aggregation: 'last',
    //     dynamicFrom: timeRange,
    //     dynamicTo: 'now',
    //     metric: metricKey,
    //     operator,
    //     threshold: serverValueFormatter(firstInputValue)
    //   })
    // }
  }
  //
  //   function onOperatorChange (operator) {
  //
  //     const formatter =
  //       Operator[operator].metricFormatter || defaultMetricFormatter
  //
  //     const newMetricKey = formatter({ metric: baseMetric.key, timeRange })
  //
  //     setOperator(operator)
  //     setMetricKey(newMetricKey)
  //
  //     if (firstInputValue) {
  //       onMetricUpdate({
  //         operator,
  //         threshold: firstInputValue,
  //         key: newMetricKey
  //       })
  //     }
  //   }
  //
  //   function onMetricUpdate (props) {
  //     const {
  //       key,
  //       dataKey = key,
  //       serverValueFormatter = defaultValueFormatter
  //     } = Operator[props.operator || operator]
  //     updMetricInFilter({
  //       aggregation: 'last',
  //       dynamicFrom: props.timeRange || timeRange,
  //       dynamicTo: 'now',
  //       metric: props.key || metricKey,
  //       operator: dataKey,
  //       threshold: serverValueFormatter(props.threshold || firstInputValue)
  //     })
  //   }
  //
  //   function onFirstThresholdChange ({ currentTarget: { value } }) {
  //     const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
  //     setFirstInputValue(newValue)
  //     onMetricUpdateDebounced({ threshold: newValue })
  //   }
  //
  //   function toggleTimeRange (timeRange) {
  //     const activeIndex = timeRanges.indexOf(timeRange)
  //     const nextIndex = activeIndex + 1 >= timeRanges.length ? 0 : activeIndex + 1
  //     const nextTimeRange = timeRanges[nextIndex]
  //     const formatter =
  //       Operator[operator].metricFormatter || defaultMetricFormatter
  //     const newMetricKey = formatter({
  //       metric: baseMetric.key,
  //       timeRange: nextTimeRange
  //     })
  //     setTimeRange(nextTimeRange)
  //     setMetricKey(newMetricKey)
  //
  //     if (firstInputValue) {
  //       onMetricUpdate({ timeRange: nextTimeRange, key: newMetricKey })
  //     }
  //   }

  return (
    <>
      <FilterMetricState
        isActive={isActive}
        isAuthor={isAuthor}
        onCheckboxClicked={onCheckboxClicked}
        metric={baseMetric}
      />
      {isActive && isAuthor && (
        <FilterMetricSettings
          FilterType={filterType}
          operator={operator}
          // onOperatorChange={onOperatorChange}
          firstThreshold={firstThreshold}
          // onFirstThresholdChange={onFirstThresholdChange}
          timeRange={timeRange}
          timeRanges={timeRanges}
          // onTimeRangeChange={onTimeRangeChange}
        />
      )}
    </>
  )
}

export default FilterMetric
