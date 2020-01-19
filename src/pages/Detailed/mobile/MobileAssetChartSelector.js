import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'

const MobileAssetChartSelector = ({
  isFullscreen,
  timeRange,
  onChangeTimeRange
}) => {
  const options = isFullscreen
    ? ['1d', '1w', '1m', '3m', '6m', '1y', 'all']
    : ['1w', '1m', '3m', '6m', 'all']
  let defaultTimeRange
  if (options.includes(timeRange)) {
    defaultTimeRange = timeRange
  } else {
    defaultTimeRange = options[3]
    onChangeTimeRange(defaultTimeRange)
  }
  return (
    <Selector
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

export default MobileAssetChartSelector
