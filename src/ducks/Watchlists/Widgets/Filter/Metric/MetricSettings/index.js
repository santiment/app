import React, { useRef } from 'react'
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
  onSecondThresholdChange,
  onSuggestionClick,
  autoFocus,
  settings: { firstThreshold, secondThreshold, timeRange, type }
}) => {
  const inputRef = useRef(null)
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
          isDefaultOpen={autoFocus}
          onChange={props => {
            onFilterTypeChange(props)

            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
          showPercentFilters={percentTimeRanges && percentTimeRanges.length > 0}
          isOnlyPercentFilters={metric.isOnlyPercentFilters}
        />
        <ValueInput
          type={type}
          metric={metric}
          defaultValue={firstThreshold}
          onChange={onFirstThresholdChange}
          forwardedRef={inputRef}
        />
        {Filter[type].showSecondInput && (
          <>
            <span className={styles.connector}>to</span>
            <ValueInput
              type={type}
              metric={metric}
              defaultValue={secondThreshold}
              onChange={onSecondThresholdChange}
            />
          </>
        )}
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
