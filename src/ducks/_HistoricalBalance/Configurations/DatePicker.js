import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './index.module.scss'

const TIMERANGES = ['1D', '1W', '1M', '3M', '6M', 'All']

const TimeRanges = ({ timeRange, onTimerangeChange }) => (
  <Selector
    className={styles.timeranges}
    options={TIMERANGES}
    defaultSelected={timeRange}
    onSelectOption={onTimerangeChange}
  />
)

const Calendar = ({ settings, onCalendarChange, onTimerangeChange }) => {
  const { from, to, timeRange } = settings

  return (
    <AdvancedCalendar
      className={styles.calendar}
      from={new Date(from)}
      to={new Date(to)}
      timeRange={timeRange}
      onCalendarChange={onCalendarChange}
      onTimerangeChange={onTimerangeChange}
    />
  )
}

const DatePicker = ({ settings, isPhone, changeTimePeriod }) => {
  function onTimerangeChange(timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange.toLowerCase())
    changeTimePeriod(from, to, timeRange)
  }

  function onCalendarChange([from, to]) {
    changeTimePeriod(from, to)
  }

  return (
    <>
      <TimeRanges
        timeRange={settings.timeRange}
        onTimerangeChange={onTimerangeChange}
      ></TimeRanges>

      {!isPhone && (
        <Calendar
          settings={settings}
          changeTimePeriod={changeTimePeriod}
          onTimerangeChange={onTimerangeChange}
          onCalendarChange={onCalendarChange}
        />
      )}
    </>
  )
}

export default DatePicker
