import React, { useMemo, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Setting from './Setting'
import { mergeMetricSettingMap } from '../../utils'
import styles from './index.module.scss'

const makeInterval = (key, label) => ({ key, label })

const INTERVALS = [
  makeInterval('5m', '5 minutes'),
  makeInterval('15m', '15 minutes'),
  makeInterval('30m', '30 minutes'),
  makeInterval('1h', '1 hour'),
  makeInterval('2h', '2 hours'),
  makeInterval('3h', '3 hours'),
  makeInterval('4h', '4 hours'),
  makeInterval('8h', '8 hours'),
  makeInterval('12h', '12 hours'),
  makeInterval('1d', '1 day')
]

const IntervalSetting = ({
  metric,
  widget,
  interval: chartInterval,
  rerenderWidgets
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const interval = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      return settings ? settings.interval : chartInterval
    },
    [widget.MetricSettingMap]
  )

  function openMenu () {
    setIsOpened(true)
  }

  function closeMenu () {
    setIsOpened(false)
  }

  function onChange (newInterval) {
    const newMap = new Map()

    newMap.set(metric, {
      interval: newInterval
    })

    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      newMap
    )

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
      {INTERVALS.map(({ key, label }) => (
        <Button
          key={key}
          variant='ghost'
          isActive={interval === key}
          onClick={() => onChange(key)}
        >
          {label}
        </Button>
      ))}
    </ContextMenu>
  )
}

export default IntervalSetting
