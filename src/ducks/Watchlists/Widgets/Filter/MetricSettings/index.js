import React from 'react'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import TypeDropdown from './TypeDropdown'
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
      <Button
        className={styles.timerange}
        border
        variant='flat'
        onClick={() => onTimeRangeChange(timeRange)}
      >
        {timeRange}
      </Button>
    )}
  </div>
)

export default FilterMetricSettings
