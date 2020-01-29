import React from 'react'
import withSizes from 'react-sizes'
import Selector from '@santiment-network/ui/Selector/Selector'
import { mapSizesToProps } from '../../../utils/withSizes'

const FULL_SET_OPTIONS = ['1d', '1w', '1m', '3m', '6m', '1y', 'all']
const SHORT_SET_OPTIONS = ['1w', '1m', '3m', '6m', 'all']

const MobileAssetChartSelector = ({
  isFullscreen,
  isSmallPhone,
  timeRange,
  className,
  onChangeTimeRange
}) => {
  const options =
    isFullscreen || !isSmallPhone ? FULL_SET_OPTIONS : SHORT_SET_OPTIONS
  let defaultTimeRange
  if (options.includes(timeRange)) {
    defaultTimeRange = timeRange
  } else {
    defaultTimeRange = options[3]
    onChangeTimeRange(defaultTimeRange)
  }
  return (
    <Selector
      className={className}
      options={options}
      onSelectOption={value => {
        if (value !== timeRange) {
          onChangeTimeRange(value)
        }
      }}
      defaultSelected={defaultTimeRange}
    />
  )
}

export default withSizes(mapSizesToProps)(MobileAssetChartSelector)
