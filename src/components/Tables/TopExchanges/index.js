import React from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import { columns } from './columns'
import { useTopExchanges } from './gql'
import {
  CustomLoadingComponent,
  CustomNoDataComponent
} from '../../../ducks/Watchlists/Widgets/Table/AssetsTable'
import styles from './index.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'balance',
    desc: true
  }
]

export const TopExchangesTableTitle = ({
  loading,
  items,
  title = 'Holdings on the top exchanges'
}) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.text}>{title}</h3>
    </div>
  )
}

const TopExchanges = ({ className, ...props }) => {
  const [items, loading] = useTopExchanges(props)

  return (
    <>
      <TopExchangesTableTitle loading={loading} items={items} />
      <TopExchangesTable
        className={className}
        items={items}
        loading={loading}
      />
    </>
  )
}

const TopExchangesTable = ({ className, items, loading }) => {
  return (
    <div className={cx(className, styles.table)}>
      <ReactTable
        className={styles.topExchangesTable}
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
            repeat={10}
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

export default TopExchanges
