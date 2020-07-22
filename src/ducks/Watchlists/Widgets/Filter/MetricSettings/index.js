import React from 'react'
import Input from '@santiment-network/ui/Input'
import TypeDropdown from './TypeDropdown'
import TimeRangeDropdown from './TimeRangeDropdown'
import { Filter } from '../types'
import styles from './index.module.scss'

const FilterMetricSettings = ({
  isPro,
  timeRanges,
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
    <Input onChange={onFirstThresholdChange} defaultValue={firstThreshold} />
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
