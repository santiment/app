import React from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import { dateDifference, DAY } from '../../utils/dates'
import styles from './IntervalSelector.module.scss'

export const getNewInterval = (from, to, lastInterval) => {
  const intervals = getAvailableIntervals(from, to)

  if (intervals.includes(lastInterval)) {
    return lastInterval
  }

  return intervals[intervals.length - 1]
}

const getAvailableIntervals = (from, to) => {
  const { diff } = dateDifference({
    from: new Date(from),
    to: new Date(to),
    format: DAY
  })

  if (diff < 6) {
    return [
      { index: '10m', content: '10min' },
      { index: '30m', content: '30min' },
      '1h'
    ]
  }
  if (diff < 33) {
    return ['1h', '2h', '3h']
  }
  if (diff < 63) {
    return ['6h', '8h', '12h']
  }
  if (diff < 183) {
    return ['12h', '1d', '2d']
  }
  if (diff < 363) {
    return ['2d', '4d', '7d']
  }

  return ['7d', '10d', '14d']
}

const IntervalSelector = ({ from, to, interval, onIntervalChange }) => {
  const options = getAvailableIntervals(from, to)

  const selected = options.find(option => {
    const { index = option } = option
    return index === interval
  })

  return (
    <Dropdown
      options={options}
      selected={selected}
      onSelect={onIntervalChange}
      classes={styles}
    />
  )
}

export default IntervalSelector
