import React, { useRef, useMemo, useState } from 'react'
import { COLUMNS, getItemKey } from './columns'
import { TabType } from '../defaults'
import { useAddressTransactions } from '../hooks'
import PagedTable, { buildPageSizes } from '../../_Table/Paged'
import styles from './index.module.scss'

const PAGE_SIZES = buildPageSizes([20, 50])
const ACTIVE_TAB = TabType.LATEST_TRANSACTIONS

const RecentTransactions = ({ settings }) => {
  const pagesItems = useRef([]).current
  const [page, setPage] = useState(0)
  const { transactions, isLoading } = useAddressTransactions(
    settings,
    ACTIVE_TAB,
    page + 1
  )
  const nextTransactions = useAddressTransactions(
    settings,
    ACTIVE_TAB,
    page + 2,
    isLoading
  ).transactions

  const items = useMemo(
    () => {
      pagesItems[page] = transactions
      pagesItems[page + 1] = nextTransactions
      return pagesItems.flat()
    },
    [transactions, nextTransactions]
  )

  return (
    <PagedTable
      className={styles.table}
      columns={COLUMNS}
      pageSizes={PAGE_SIZES}
      minRows={10}
      items={items}
      itemProps={settings}
      isLoading={isLoading}
      onPageChange={setPage}
      getItemKey={getItemKey}
    />
  )
}

export default RecentTransactions
