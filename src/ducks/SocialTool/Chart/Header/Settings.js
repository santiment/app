import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import CalendarBtn from '../../../../components/Calendar/CalendarBtn'
import ContextMenu from '../../../Studio/Header/ContextMenu'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../../SANCharts/IntervalSelector'
import PricePairsDropdown from '../PricePairsDropdown'
import {
  getIntervalByTimeRange,
  getTimeIntervalFromToday,
  DAY
} from '../../../../utils/dates'
import styles from './Settings.module.scss'

const TIMERANGE_OPTIONS = ['1W', '1M', '3M', '6M', '1Y']

const { to: MAX_DATE } = getTimeIntervalFromToday(0, DAY)

export default ({
  settings,
  options,
  setOptions,
  setSettings,
  className,
  ...rest
}) => {
  const { timeRange = '', from, to, title } = settings

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
        options={TIMERANGE_OPTIONS}
        onSelectOption={onTimerangeChange}
        defaultSelected={timeRange.toUpperCase()}
      />
      <CalendarBtn
        onChange={onCalendarChange}
        value={[new Date(from), new Date(to)]}
        className={styles.calendar}
        maxDate={MAX_DATE}
      />
      <PricePairsDropdown
        {...rest}
        settings={settings}
        setSettings={setSettings}
      />
      <ContextMenu
        title={title}
        showMulti={false}
        showNightModeToggle={false}
        showDownload
        setOptions={setOptions}
        {...options}
        {...rest}
      />
    </div>
  )
}
