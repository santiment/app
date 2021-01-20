import React, { useMemo } from 'react'
import { useDropdown } from '../../../ducks/Studio/Chart/MetricSettings/Dropdown'
import { useMetricIntervals } from '../../../ducks/Studio/Chart/MetricSettings/hooks'
import {
  IntervalSettingsTemplate,
  isAvailableInterval
} from '../../../ducks/Studio/Chart/MetricSettings/IntervalSetting'
import styles from './DashIntervalSettings.module.scss'

const DashIntervalSettings = ({ settings, metric, setSettings }) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const intervals = useMetricIntervals(metric)
  const interval = useMemo(
    () => {
      const interval = settings && settings.interval
      return isAvailableInterval(interval, intervals)
        ? interval
        : intervals[0].key
    },
    [settings, intervals, metric]
  )

  function onChange (newInterval) {
    setSettings({
      ...settings,
      interval: newInterval
    })

    close()
  }
  return (
    <div className={styles.settings}>
      <IntervalSettingsTemplate
        intervals={intervals}
        interval={interval}
        onChange={onChange}
        activeRef={activeRef}
        dd={Dropdown}
      />
    </div>
  )
}

export default DashIntervalSettings
