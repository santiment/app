import React from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import { getTimerangePeriod, dateDifference, DAY } from '../../utils/dates'
import styles from './IntervalSelector.module.scss'

export const INTERVAL_ALIAS = {
  '5min': '5m',
  '15min': '15m',
  '30min': '30m'
}

export const getNewInterval = (from, to, lastInterval, options = {}) => {
  const intervals = getAvailableIntervals(from, to)

  if (intervals.includes(lastInterval)) {
    return lastInterval
  }

  return options.isMobile ? intervals[1] : intervals[0]
}

const getAvailableIntervals = (from, to) => {
  const { diff } = dateDifference({
    from: new Date(from),
    to: new Date(to),
    format: DAY
  })

  if (diff < 7) {
    return ['5min', '30min', '1h']
  }
  if (diff < 14) {
    return ['15min', '1h', '2h']
  }
  if (diff < 20) {
    return ['30min', '2h', '3h']
  }
  if (diff < 33) {
    return ['1h', '3h', '4h']
  }
  if (diff < 63) {
    return ['2h', '8h', '12h']
  }
  if (diff < 100) {
    return ['3h', '1d', '2d']
  }
  if (diff < 185) {
    return ['4h', '1d', '2d']
  }
  if (diff < 360) {
    return ['8h', '5d', '7d']
  }
  if (diff < 800) {
    return ['12h']
  }
  if (diff < 1400) {
    return ['1d']
  }

  return ['7d', '10d', '14d']
}

export const formIntervalSettings = value => {
  const { from, to } = getTimerangePeriod(value)
  const interval = getNewInterval(from, to)

  return {
    from,
    to,
    interval: INTERVAL_ALIAS[interval] || interval
  }
}

const IntervalSelector = ({ from, to, interval, onIntervalChange }) => {
  const options = getAvailableIntervals(from, to)

  return (
    <Dropdown
      options={options}
      selected={interval}
      onSelect={onIntervalChange}
      classes={styles}
    />
  )
}

export default IntervalSelector
