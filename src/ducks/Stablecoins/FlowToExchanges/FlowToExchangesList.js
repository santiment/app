import React, { useMemo, useState } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import { EXCHANGES_DEFAULT_SETTINGS, useFlowToExchanges } from './utils'
import FlowToExchanges from './FlowToExchanges'
import PageLoader from '../../../components/Loader/PageLoader'
import styles from './FlowToExchangesList.module.scss'

const GROUPS = {
  'Centralized Exchanges': { key: 'exchange_inflow_centralized' },
  'Decentralized Exchanges': { key: 'exchange_inflow_decentralized' }
}

const TABS = Object.keys(GROUPS)

const FlowToExchangesList = () => {
  const [tab, setTab] = useState(TABS[0])
  const { data, loading } = useFlowToExchanges(EXCHANGES_DEFAULT_SETTINGS)

  const key = useMemo(
    () => {
      const { key } = GROUPS[tab]
      return key
    },
    [data, tab]
  )

  const prepared = useMemo(
    () => {
      return data
        .filter(item => item[key] !== null)
        .map(item => ({
          ...item,
          value: item[key]
        }))
    },
    [data, key]
  )

  return (
    <div className={styles.container}>
      <Tabs
        className={styles.tabs}
        options={TABS}
        defaultSelectedIndex={tab}
        onSelect={tab => setTab(tab)}
        classes={styles}
      />

      {!loading && (
        <div className={styles.list}>
          {prepared.map((item, index) => (
            <FlowToExchanges item={item} key={index} />
          ))}
        </div>
      )}

      {loading && <PageLoader />}
    </div>
  )
}

export default FlowToExchangesList
