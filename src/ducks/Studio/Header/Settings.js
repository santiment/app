import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import Toggle from '@santiment-network/ui/Toggle'
import CalendarBtn from '../../../components/Calendar/CalendarBtn'
import ChartSettingsContextMenu from '../../SANCharts/ChartSettingsContextMenu'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../SANCharts/IntervalSelector'
import { saveToggle } from '../../../utils/localStorage'
import {
  getIntervalByTimeRange,
  getTimeIntervalFromToday,
  DAY
} from '../../../utils/dates'
import styles from './Settings.module.scss'

const TIMERANGE_OPTIONS = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL']

const { to: MAX_DATE } = getTimeIntervalFromToday(0, DAY)

export default ({
  settings = {},
  options = {},
  comparables = [],
  setOptions = () => {},
  setSettings = () => {},
  className,
  ...rest
}) => {
  const { timeRange, from, to, title } = settings

  function toggleMultichart () {
    setOptions(state => ({
      ...state,
      isMultiChartsActive: saveToggle(
        'isMultiChartsActive',
        !state.isMultiChartsActive
      )
    }))
  }

  function toggleScale () {
    setOptions(state => ({
      ...state,
      isLogScale: !state.isLogScale
    }))
  }

  function toggleCartesianGrid () {
    setOptions(state => ({
      ...state,
      isCartesianGridActive: saveToggle(
        'isCartesianGridActive',
        !state.isCartesianGridActive
      )
    }))
  }

  function toggleDomainGrouping () {
    setOptions(state => ({
      ...state,
      isDomainGroupingActive: saveToggle(
        'isDomainGroupingActive',
        !state.isDomainGroupingActive
      )
    }))
  }

  function onTimerangeChange (timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange.toLowerCase())
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
    <div className={cx(styles.wrapper, className)}>
      <Selector
        className={styles.selector}
        options={options.timeRanges || TIMERANGE_OPTIONS}
        onSelectOption={onTimerangeChange}
        defaultSelected={timeRange.toUpperCase()}
      />
      {!options.hideCalendar && (
        <CalendarBtn
          onChange={onCalendarChange}
          value={[new Date(from), new Date(to)]}
          className={styles.calendar}
          maxDate={MAX_DATE}
        />
      )}
      {comparables.length > 0 && (
        <div className={styles.domain} onClick={toggleDomainGrouping}>
          Shared axis
          <Toggle
            isActive={options.isDomainGroupingActive}
            className={styles.domain__toggle}
          />
        </div>
      )}
      <ChartSettingsContextMenu
        showNightModeToggle={false}
        title={title}
        onCartesianGridChange={toggleCartesianGrid}
        onScaleChange={toggleScale}
        onMultiChartsChange={toggleMultichart}
        showDownload
        showMulti
        {...options}
        {...rest}
      />
    </div>
  )
}
