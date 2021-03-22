import React, { useMemo } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import {
  getValidInterval,
  useMetricIntervals,
  useCandlesMinIntervalGetter
} from './hooks'
import { mergeMetricSettingMap } from '../../utils'
import styles from './index.module.scss'

const IntervalSetting = ({
  metric,
  widget,
  interval: chartInterval,
  from,
  to,
  rerenderWidgets
}) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const candlesMinIntervalGetter = useCandlesMinIntervalGetter(from, to)
  const intervals = useMetricIntervals(metric, candlesMinIntervalGetter)
  const interval = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      const metricInterval = settings && settings.interval
      const interval = metricInterval || chartInterval
      return getValidInterval(interval, intervals)
    },
    [widget.MetricSettingMap, intervals, metric]
  )

  function onChange (newInterval) {
    if (newInterval === chartInterval) {
      const newMap = new Map(widget.MetricSettingMap)
      delete newMap.get(metric).interval
      widget.MetricSettingMap = newMap
    } else {
      const newMap = new Map()

      newMap.set(metric, {
        interval: newInterval
      })

      widget.MetricSettingMap = mergeMetricSettingMap(
        widget.MetricSettingMap,
        newMap
      )
    }

    close()
    rerenderWidgets()
  }
  return (
    <IntervalSettingsTemplate
      intervals={intervals}
      interval={interval}
      onChange={onChange}
      activeRef={activeRef}
      dd={Dropdown}
    />
  )
}

export const IntervalSettingsTemplate = ({
  intervals,
  interval,
  onChange,
  activeRef,
  dd: Dropdown
}) => {
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
