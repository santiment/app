import React, { useMemo } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { useMetricIntervals } from './hooks'
import { mergeMetricSettingMap } from '../../utils'
import styles from './index.module.scss'

const isAvailableInterval = (interval, intervals) =>
  intervals.some(({ key }) => key === interval)

const IntervalSetting = ({
  metric,
  widget,
  interval: chartInterval,
  rerenderWidgets
}) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const intervals = useMetricIntervals(metric)
  const interval = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      const metricInterval = settings && settings.interval
      const interval = metricInterval || chartInterval
      return isAvailableInterval(interval, intervals)
        ? interval
        : intervals[0].key
    },
    [widget.MetricSettingMap, intervals, metric]
  )

  function onChange (newInterval) {
    if (newInterval === chartInterval) {
      const newMap = new Map(widget.MetricSettingMap)
      delete newMap.get(metric).interval
      debugger
      widget.MetricSettingMap = newMap
    } else {
      const newMap = new Map()

      newMap.set(metric, {
        interval: newInterval
      })

      debugger
      widget.MetricSettingMap = mergeMetricSettingMap(
        widget.MetricSettingMap,
        newMap
      )
    }

    close()
    rerenderWidgets()
  }
  return (
    <Dropdown
      trigger={
        <Setting>
          <Icon className={styles.icon} type='interval' />
          Interval {interval}
        </Setting>
      }
    >
      {intervals.map(({ key, label }) => (
        <Button
          key={key}
          variant='ghost'
          isActive={interval === key}
          onClick={() => onChange(key)}
          forwardedRef={interval === key ? activeRef : undefined}
        >
          {label}
        </Button>
      ))}
    </Dropdown>
  )
}

export default IntervalSetting
