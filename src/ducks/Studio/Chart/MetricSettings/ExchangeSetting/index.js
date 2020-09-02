import React, { useEffect, useMemo, useState, useRef } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Setting from '../Setting'
import { useMetricExchanges, DEFAULT_EXCHANGE } from './hooks'
import { mergeMetricSettingMap } from '../../../utils'
import styles from '../index.module.scss'

const ExchangeSetting = ({ metric, widget, rerenderWidgets, slug }) => {
  const activeRef = useRef()
  const [isOpened, setIsOpened] = useState(false)
  const exchanges = useMetricExchanges(slug)
  const owner = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      return (settings && settings.owner) || DEFAULT_EXCHANGE
    },
    [widget.MetricSettingMap, metric]
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

  function onChange (newOwner) {
    const newMap = new Map()
    const isExchangeRemoved = newOwner === DEFAULT_EXCHANGE

    // NOTE: Inflow/Outflow requires queryKey change [@vanguard | Sep  2, 2020]
    newMap.set(metric, {
      queryKey: isExchangeRemoved ? undefined : metric.key + '_per_exchange',
      owner: isExchangeRemoved ? undefined : newOwner
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
      trigger={<Setting>Exchange {owner}</Setting>}
    >
      {exchanges &&
        exchanges.map(exchange => (
          <Button
            key={exchange}
            variant='ghost'
            isActive={owner === exchange}
            onClick={() => onChange(exchange)}
            forwardedRef={owner === exchange ? activeRef : undefined}
          >
            {exchange}
          </Button>
        ))}
    </ContextMenu>
  )
}

export default ExchangeSetting
