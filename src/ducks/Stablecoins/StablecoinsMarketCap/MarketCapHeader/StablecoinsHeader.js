import React, { useMemo } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import styles from './MarketCapHeader.module.scss'

export const StablecoinsIntervals = ({ interval, setInterval, intervals }) => {
  const tabs = useMemo(
    () => {
      return intervals.map(({ label }) => label)
    },
    [intervals]
  )

  return (
    <div>
      <Tabs
        options={tabs}
        defaultSelectedIndex={interval.label}
        onSelect={tab => {
          const foundTab = intervals.find(({ label }) => label === tab)
          if (foundTab) {
            setInterval(foundTab)
          }
        }}
        className={styles.tabs}
        classes={styles}
      />
    </div>
  )
}

const StablecoinsHeader = ({ title, children }) => {
  return (
    <div className={styles.container}>
      {title}
      {children}
    </div>
  )
}

export default StablecoinsHeader
