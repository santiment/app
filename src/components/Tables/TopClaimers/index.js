import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Table from '../../../ducks/Table'
import IntervalsComponent from '../../IntervalsComponent/IntervalsComponent'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import { useTopClaimers, useUNIBalances, useUNITransactionVolume } from './gql'
import styles from './index.module.scss'

const to = 'utc_now'

export const RANGES = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 1, label: '24h' },
]

function getBalance (balances = [], address) {
  const { balanceEnd: balance = '' } = balances.find((item) => item.address === address) || {}

  return balance
}

function getVolumes (volumes = [], address) {
  const {
    transactionVolumeInflow: volumeInflow = '',
    transactionVolumeOutflow: volumeOutflow = '',
  } = volumes.find((item) => item.address === address) || {}

  return { volumeInflow, volumeOutflow }
}

function makeData ({ items, balances, volumes }) {
  return items.map(({ address, ...rest }) => ({
    address,
    ...rest,
    balance: getBalance(balances, address),
    ...getVolumes(volumes, address),
  }))
}

export const TopClaimersTableTitle = ({ setInterval, loading, items }) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.text}>Top Claimers</h3>
      <IntervalsComponent onChange={setInterval} defaultIndex={0} ranges={RANGES} />
      {loading && items.length > 0 && <Loader className={styles.headerLoader} />}
    </div>
  )
}

const TopClaimers = ({ className }) => {
  const [interval, setInterval] = useState(RANGES[0].value)
  const from = `utc_now-${interval}d`
  const [items, loading] = useTopClaimers({ from, to })
  const { isPro } = useUserSubscriptionStatus()

  const addresses = items.map(({ address }) => address)
  const [balances] = useUNIBalances({ addresses, from, to })
  const [volumes] = useUNITransactionVolume({ addresses, from, to })

  const data = useMemo(() => makeData({ items, balances, volumes }), [items, balances, volumes])
  const columns = useMemo(() => COLUMNS, [])

  return (
    <>
      <TopClaimersTableTitle setInterval={setInterval} loading={loading} items={items} />
      {!isPro ? (
        <MakeProSubscriptionCard classes={{ card: className }} />
      ) : (
        <Table
          data={data}
          columns={columns}
          options={{
            loadingSettings: {
              repeatLoading: 10,
              isLoading: loading && items.length === 0,
            },
            sortingSettings: {
              defaultSorting: DEFAULT_SORTING,
              allowSort: true,
            },
            stickySettings: {
              isStickyHeader: true,
              isStickyColumn: true,
              stickyColumnIdx: 0,
            },
          }}
          className={cx(className, styles.tableWrapper)}
          classes={{
            table: styles.table,
            loader: styles.loadingWrapper,
            loaderRow: styles.loadingRow,
          }}
        />
      )}
    </>
  )
}

export default TopClaimers
