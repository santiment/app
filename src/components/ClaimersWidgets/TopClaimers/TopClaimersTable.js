import React, { useState } from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import { columns } from './columns'
import { useTopClaimers } from './gql'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
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

export const RANGES = [{ value: 1, label: '24h' }, { value: 7, label: '7d' }]

export const TopClaimersTableTitle = ({ setInterval }) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.text}>Top Claimers</h3>
      <IntervalsComponent
        onChange={setInterval}
        defaultIndex={1}
        ranges={RANGES}
      />
    </div>
  )
}

const TopClaimers = ({ className }) => {
  const [interval, setInterval] = useState(1)

  return (
    <>
      <TopClaimersTableTitle setInterval={setInterval} />
      <TopClaimersTable className={className} interval={interval} />
    </>
  )
}

const TopClaimersTable = ({ className, interval }) => {
  console.log(interval)
  const { isPro } = useUserSubscriptionStatus()
  const { from, to } = getTimeIntervalFromToday(-interval, DAY)
  const [items, loading] = useTopClaimers({
    from: from.toISOString(),
    to: to.toISOString()
  })

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
