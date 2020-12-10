import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import { useTopClaimers, useUNIBalances, useUNITransactionVolume } from './gql'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import IntervalsComponent from '../../IntervalsComponent/IntervalsComponent'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import Table from '../../../ducks/Table'
import styles from './table.module.scss'

const to = 'utc_now'

export const RANGES = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 1, label: '24h' }
]

function getBalance (balances = [], address) {
  const { balanceEnd: balance = '' } =
    balances.find(item => item.address === address) || {}

  return balance
}

function getVolumes (volumes = [], address) {
  const {
    transactionVolumeInflow: volumeInflow = '',
    transactionVolumeOutflow: volumeOutflow = ''
  } = volumes.find(item => item.address === address) || {}

  return { volumeInflow, volumeOutflow }
}

export const TopClaimersTableTitle = ({ setInterval, loading, items }) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.text}>Top Claimers</h3>
      <IntervalsComponent
        onChange={setInterval}
        defaultIndex={0}
        ranges={RANGES}
      />
      {loading && items.length > 0 && (
        <Loader className={styles.headerLoader} />
      )}
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

  const tableItems = items.map(({ address, ...rest }) => ({
    address,
    ...rest,
    balance: getBalance(balances, address),
    ...getVolumes(volumes, address)
  }))

  const data = useMemo(() => tableItems, [tableItems, balances])
  const columns = useMemo(() => COLUMNS, [])

  return (
    <>
      <TopClaimersTableTitle
        setInterval={setInterval}
        loading={loading}
        items={items}
      />
      {!isPro ? (
        <MakeProSubscriptionCard classes={{ card: className }} />
      ) : (
        <Table
          className={cx(className, styles.tableWrapper)}
          data={data}
          columns={columns}
          isLoading={loading && data.length === 0}
          repeatLoading={10}
          isNoData={!loading && data.length === 0}
          options={{
            withSorting: true,
            initialState: { sortBy: DEFAULT_SORTING },
            isStickyHeader: true,
            isStickyColumn: true,
            stickyColumnIdx: 0
          }}
          classes={{
            table: styles.table,
            loader: styles.loadingWrapper,
            loaderRow: styles.loadingRow
          }}
        />
      )}
    </>
  )
}

export default TopClaimers
