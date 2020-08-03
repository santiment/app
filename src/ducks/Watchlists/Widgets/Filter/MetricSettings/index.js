import React from 'react'
import TypeDropdown from './TypeDropdown'
import TimeRangeDropdown from './TimeRangeDropdown'
import ValueInput from './ValueInput'
import { Filter } from '../types'
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip'
import { DEFAULT_TIMERANGES } from '../defaults'
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
      {metric.hints && (
        <div className={styles.suggestions}>
          Suggestions:
          {metric.hints.map(({ label, description, ...props }) => (
            <DarkTooltip
              position='bottom'
              align='center'
              on='hover'
              className={styles.tooltip}
              trigger={
                <span
                  className={styles.hint}
                  onClick={() => onSuggestionClick(props)}
                >
                  {label}
                </span>
              }
            >
              {description}
            </DarkTooltip>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterMetricSettings
