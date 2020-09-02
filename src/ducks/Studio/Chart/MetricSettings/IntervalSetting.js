import React, { useEffect, useMemo, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Setting from './Setting'
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
  const activeRef = useRef()
  const [isOpened, setIsOpened] = useState(false)
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

  useEffect(
    () => {
      const btn = activeRef.current
      if (isOpened && btn) {
        const { parentNode } = btn

        // NOTE: .scrollIntoView also scrolls the window viewport [@vanguard | Aug 12, 2020]
        parentNode.scrollTop = btn.offsetTop - parentNode.clientHeight / 2
      }
    },
    [isOpened]
  )

  function openMenu () {
    setIsOpened(true)
  }

  function closeMenu () {
    setIsOpened(false)
  }

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

    closeMenu()
    rerenderWidgets()
  }
  return (
    <ContextMenu
      open={isOpened}
      className={styles.tooltip}
      position='bottom'
      on='click'
      onOpen={openMenu}
      onClose={closeMenu}
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
    </ContextMenu>
  )
}

export default IntervalSetting
