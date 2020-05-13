import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import ContextMenu from './ContextMenu'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './Settings.module.scss'

export default ({
  settings,
  options,
  setOptions,
  setSettings,
  className,
  toggleMultiCharts,
  showMulti = true,
  ...rest
}) => {
  const { timeRange, from, to, title } = settings

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
    <div className={cx(styles.wrapper, className)}>
      <AdvancedCalendar
        className={styles.calendar}
        from={new Date(from)}
        to={new Date(to)}
        timeRange={timeRange}
        onCalendarChange={onCalendarChange}
        onTimerangeChange={onTimerangeChange}
      />
      {showMulti && (
        <div className={styles.multi} onClick={toggleMultiCharts}>
          Multi charts
          <Toggle
            isActive={options.isMultiChartsActive}
            className={styles.multi__toggle}
          />
        </div>
      )}
      <ContextMenu
        title={title}
        showNightModeToggle={false}
        showDownload
        showMulti={false}
        setOptions={setOptions}
        {...options}
        {...rest}
      />
    </div>
  )
}
