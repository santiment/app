import React, { useMemo } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import AdvancedCalendar from '../../AdvancedCalendar'
import { getValidInterval } from '../../../ducks/SANCharts/IntervalSelector'
import styles from './DashboardChartHeaderWrapper.module.scss'

export const DashboardIntervals = ({ interval, setInterval, intervals }) => {
  const tabs = useMemo(
    () => {
      return intervals.map(({ label }) => label)
    },
    [intervals]
  )

  return (
    <Tabs
      options={tabs}
      defaultSelectedIndex={interval.label}
      onSelect={tab => {
        const target = intervals.find(({ label }) => label === tab)
        if (target) {
          setInterval(target)
        }
      }}
      className={styles.tabs}
      classes={styles}
    />
  )
}

export const DashboardCalendar = ({ interval, setInterval, intervals }) => {
  const {
    requestParams: { from, to },
    value
  } = interval

  const onCalendarChange = ([from, to]) => {
    const interval = getValidInterval(from, to)
    setInterval({
      requestParams: {
        from,
        to,
        interval
      }
    })
  }

  const onTimerangeChange = range => {
    const target = intervals.find(({ value }) => value === range)
    if (target) {
      setInterval(target)
    }
  }

  return (
    <AdvancedCalendar
      className={styles.calendar}
      from={from}
      to={to}
      timeRange={value}
      onCalendarChange={onCalendarChange}
      onTimerangeChange={onTimerangeChange}
      options={intervals}
    />
  )
}

const DashboardChartHeaderWrapper = ({ title, children }) => (
  <div className={styles.container}>
    {title}
    {children}
  </div>
)

export default DashboardChartHeaderWrapper
