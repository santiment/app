import React from 'react'
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
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import styles from './table.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

const TopClaimersTable = ({ className }) => {
  const { isPro } = useUserSubscriptionStatus()

  const { from, to } = getTimeIntervalFromToday(-1, DAY)
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

export default TopClaimersTable
