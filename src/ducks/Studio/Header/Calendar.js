import React from 'react'
import { getIntervalByTimeRange } from '../../../utils/dates'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import styles from './Settings.module.scss'

const Calendar = ({ settings, changeTimePeriod }) => {
  const { timeRange, from, to } = settings

  function onTimerangeChange (timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange)
    changeTimePeriod(from, to, timeRange)
  }

  function onCalendarChange ([from, to]) {
    changeTimePeriod(from, to)
  }

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

export default Calendar
