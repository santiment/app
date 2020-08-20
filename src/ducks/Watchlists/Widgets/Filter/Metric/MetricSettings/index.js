import React from 'react'
import TypeDropdown from './TypeDropdown'
import TimeRangeDropdown from './TimeRangeDropdown'
import ValueInput from './ValueInput'
import { Filter } from '../../dataHub/types'
import { DEFAULT_TIMERANGES } from '../../defaults'
import Suggestions from '../Suggestions'
import styles from './index.module.scss'

const FilterMetricSettings = ({
  isPro,
  percentTimeRanges,
  metric,
  onFilterTypeChange,
  onTimeRangeChange,
  onFirstThresholdChange,
  onSuggestionClick,
  autoFocus,
  settings: { firstThreshold, timeRange, type }
}) => {
  const isShowTimeRange = Filter[type].showTimeRange || metric.showTimeRange
  let timeRanges = null

  if (isShowTimeRange) {
    if (Filter[type].showTimeRange) {
      timeRanges = percentTimeRanges
    } else if (metric.showTimeRange) {
      timeRanges = DEFAULT_TIMERANGES
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <TypeDropdown
          isPro={isPro}
          type={type}
          onChange={onFilterTypeChange}
          showPercentFilters={percentTimeRanges && percentTimeRanges.length > 0}
        />
        <ValueInput
          type={type}
          metric={metric}
          autoFocus={autoFocus}
          defaultValue={firstThreshold}
          onChange={onFirstThresholdChange}
        />
        {timeRanges && (
          <TimeRangeDropdown
            timeRange={timeRange}
            timeRanges={timeRanges}
            withInput={metric.showTimeRange && !Filter[type].showTimeRange}
            onChange={onTimeRangeChange}
          />
        )}
      </div>
      <Suggestions hints={metric.hints} onSuggestionClick={onSuggestionClick} />
    </div>
  )
}

export default FilterMetricSettings
