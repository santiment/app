import React, { useEffect, useState } from 'react'
import Range from '../../Watchlists/Widgets/WatchlistOverview/Range'
import styles from './StablecoinsIntervals.module.scss'

export const RANGES = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '1m' },
  { value: '183d', label: '6m' },
  { value: '1y', label: '1y' }
]

const StablecoinsIntervals = ({ onChange }) => {
  const [sortedByIndex, setSortedByIndex] = useState(0)
  const { value, label } = RANGES[sortedByIndex]

  useEffect(
    () => {
      onChange(value)
    },
    [value]
  )

  return (
    <Range
      className={styles.range}
      range={label}
      changeRange={() => {
        setSortedByIndex((sortedByIndex + 1) % RANGES.length)
      }}
    />
  )
}

export default StablecoinsIntervals
