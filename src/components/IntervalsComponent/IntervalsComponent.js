import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Range from '../../ducks/Watchlists/Widgets/WatchlistOverview/Range'
import styles from './IntervalsComponent.module.scss'

export const RANGES = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '1m' },
  { value: '183d', label: '6m' },
  { value: '1y', label: '1y' }
]

const IntervalsComponent = ({
  className,
  onChange,
  defaultIndex = 0,
  ranges = RANGES
}) => {
  const [sortedByIndex, setSortedByIndex] = useState(defaultIndex)
  const { value, label } = ranges[sortedByIndex]

  useEffect(
    () => {
      onChange(value)
    },
    [value]
  )

  return (
    <Range
      className={cx(styles.range, className)}
      range={label}
      changeRange={() => {
        setSortedByIndex((sortedByIndex + 1) % ranges.length)
      }}
    />
  )
}

export default IntervalsComponent
