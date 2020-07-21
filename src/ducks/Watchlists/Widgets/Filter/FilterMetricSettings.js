import React from 'react'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
// import OperatorMenu from './operators/OperatorMenu'
import { Filter } from './types'
import styles from './FilterMetricState.module.scss'

const FilterMetricSettings = ({
  operator,
  onOperatorChange,
  timeRange,
  timeRanges,
  onTimeRangeChange,
  firstThreshold,
  onFirstThresholdChange,
  FilterType
}) => (
  <div className={styles.wrapper}>
    {/* <OperatorMenu */}
    {/*   operator={operator} */}
    {/*   onChange={onOperatorChange} */}
    {/*   showPercentFilters={timeRanges && timeRanges.length > 0} */}
    {/* /> */}
    <Input onChange={onFirstThresholdChange} defaultValue={firstThreshold} />
    {FilterType.showTimeRange && (
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
