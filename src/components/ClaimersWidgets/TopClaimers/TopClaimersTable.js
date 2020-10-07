import React, { useState } from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import Loader from '@santiment-network/ui/Loader/Loader'
import { columns } from './columns'
import { useTopClaimers, useUNIBalances, useUNITransactionVolume } from './gql'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import {
  CustomLoadingComponent,
  CustomNoDataComponent
} from '../../../ducks/Watchlists/Widgets/Table/AssetsTable'
import IntervalsComponent from '../../IntervalsComponent/IntervalsComponent'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import styles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

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

  const addresses = items.map(({ address }) => address)
  const [balances] = useUNIBalances({ addresses, from, to })
  const [volumes] = useUNITransactionVolume({ addresses, from, to })

  const tableItems = items.map(({ address, ...rest }) => ({
    address,
    ...rest,
    balance: getBalance(balances, address),
    ...getVolumes(volumes, address)
  }))

  return (
    <>
      <TopClaimersTableTitle
        setInterval={setInterval}
        loading={loading}
        items={items}
      />
      <TopClaimersTable
        className={className}
        items={tableItems}
        loading={loading}
      />
    </>
  )
}

const TopClaimersTable = ({ className, items, loading }) => {
  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return <MakeProSubscriptionCard classes={{ card: className }} />
  }

  return (
    <div className={cx(className, styles.table)}>
      <ReactTable
        className={styles.claimersTable}
        defaultSorted={DEFAULT_SORTED}
        showPagination={false}
        resizable={false}
        data={items}
        columns={columns}
        showPaginationBottom
        defaultPageSize={5}
        pageSize={items.length}
        minRows={0}
        loadingText=''
        LoadingComponent={() => (
          <CustomLoadingComponent
            isLoading={loading && items.length === 0}
            repeat={15}
            classes={{ wrapper: styles.loadingWrapper, row: styles.loadingRow }}
          />
        )}
        NoDataComponent={() => (
          <CustomNoDataComponent isLoading={loading && items.length === 0} />
        )}
      />
    </div>
  )
}

export default TopClaimers
