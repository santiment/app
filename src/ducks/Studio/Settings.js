import React from 'react'
import Settings from '../../ducks/SANCharts/ChartSettings'
import { getIntervalByTimeRange } from '../../utils/dates'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../ducks/SANCharts/IntervalSelector'

export default ({ settings, options, setOptions, setSettings, ...rest }) => {
  function toggleMultichart () {
    setOptions(state => ({
      ...state,
      isMultiChartsActive: !state.isMultiChartsActive
    }))
  }

  function toggleScale () {
    setOptions(state => ({
      ...state,
      isLogScale: !state.isLogScale
    }))
  }

  function onTimerangeChange (timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange)
    changeTimePeriod(from, to, timeRange)
  }

  function onCalendarChange ([from, to]) {
    changeTimePeriod(from, to)
  }

  function changeTimePeriod (from, to, timeRange) {
    const interval = getNewInterval(from, to)

    setSettings(state => ({
      ...state,
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: from.toISOString(),
      to: to.toISOString()
    }))
  }

  return (
    <Settings
      {...rest}
      {...options}
      {...settings}
      isFullscreenAvailable={false}
      showNightModeToggle={false}
      onMultiChartsChange={toggleMultichart}
      onScaleChange={toggleScale}
      onTimerangeChange={onTimerangeChange}
      onCalendarChange={onCalendarChange}
    />
  )
}
