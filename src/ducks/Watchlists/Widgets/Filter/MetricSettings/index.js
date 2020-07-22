import React from 'react'
import TypeDropdown from './TypeDropdown'
import TimeRangeDropdown from './TimeRangeDropdown'
import ValueInput from './ValueInput'
import { Filter } from '../types'
import styles from './index.module.scss'

const FilterMetricSettings = ({
  isPro,
  timeRanges,
  metric,
  onFilterTypeChange,
  onTimeRangeChange,
  onFirstThresholdChange,
  settings: { firstThreshold, timeRange, type }
}) => (
  <div className={styles.wrapper}>
    <TypeDropdown
      isPro={isPro}
      type={type}
      onChange={onFilterTypeChange}
      showTimeRangesFilters={timeRanges && timeRanges.length > 0}
    />
    <ValueInput
      type={type}
      metric={metric}
      defaultValue={firstThreshold}
      onChange={onFirstThresholdChange}
    />
    {Filter[type].showTimeRange && (
      <TimeRangeDropdown
        timeRange={timeRange}
        timeRanges={timeRanges}
        onChange={onTimeRangeChange}
      />
    )}
  </div>
)

export default FilterMetricSettings
