import React, { useMemo } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
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
        const foundTab = intervals.find(({ label }) => label === tab)
        if (foundTab) {
          setInterval(foundTab)
        }
      }}
      className={styles.tabs}
      classes={styles}
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
