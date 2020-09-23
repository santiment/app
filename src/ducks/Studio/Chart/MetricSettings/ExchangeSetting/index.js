import React, { useState, useMemo } from 'react'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useMetricExchanges, DEFAULT_EXCHANGE } from './hooks'
import Tabs, { Tab } from './Tabs'
import { useDropdown } from '../Dropdown'
import Setting from '../Setting'
import { mergeMetricSettingMap } from '../../../utils'
import styles from '../index.module.scss'

const { CEX, DEX } = Tab

const ExchangeSetting = ({ metric, widget, rerenderWidgets, slug }) => {
  const { activeRef, close, Dropdown } = useDropdown()
  const [activeTab, setActiveTab] = useState(CEX)
  const { exchanges, loading } = useMetricExchanges(slug, activeTab === DEX)
  const owner = useMemo(
    () => {
      const settings = widget.MetricSettingMap.get(metric)
      return (settings && settings.owner) || DEFAULT_EXCHANGE
    },
    [widget.MetricSettingMap, metric]
  )

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

    close()
    rerenderWidgets()
  }

  return (
    <Dropdown trigger={<Setting>Exchange {owner}</Setting>}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.exchanges}>
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
      </div>
      {loading && <Loader className={styles.loader} />}
    </Dropdown>
  )
}

export default ExchangeSetting
