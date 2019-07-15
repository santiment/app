import React from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import { dateDifference, DAY } from '../../utils/dates'
import styles from './IntervalSelector.module.scss'

export const INTERVAL_ALIAS = {
  '10min': '10m',
  '30min': '30m'
}

export const getNewInterval = (from, to, lastInterval) => {
  const intervals = getAvailableIntervals(from, to)

  if (intervals.includes(lastInterval)) {
    return lastInterval
  }

  return intervals[0]
}

const getAvailableIntervals = (from, to) => {
  const { diff } = dateDifference({
    from: new Date(from),
    to: new Date(to),
    format: DAY
  })

  if (diff < 6) {
    return ['10min', '30min', '1h']
  }
  if (diff < 20) {
    return ['1h', '2h', '3h']
  }
  if (diff < 33) {
    return ['2h', '3h', '4h']
  }
  if (diff < 63) {
    return ['6h', '8h', '12h']
  }
  if (diff < 183) {
    return ['12h', '1d', '2d']
  }

  return ['2d', '5d', '7d']
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
