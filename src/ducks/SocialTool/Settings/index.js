import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../SANCharts/IntervalSelector'
import { getIntervalByTimeRange, DAY } from '../../../utils/dates'
import styles from './index.module.scss'

const TIMERANGE_OPTIONS = ['1W', '1M', '3M', '6M', '1Y']

export default ({ settings, setSettings }) => {
  const { timeRange } = settings

  function onTimerangeChange (timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange.toLowerCase())
    changeTimePeriod(from, to, timeRange)
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
    <div className={cx(styles.wrapper)}>
      <Selector
        className={styles.selector}
        options={TIMERANGE_OPTIONS}
        onSelectOption={onTimerangeChange}
        defaultSelected={timeRange.toUpperCase()}
      />
    </div>
  )
}
