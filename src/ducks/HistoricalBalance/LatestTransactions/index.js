import React, { useRef, useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import Section from '../Section'
import { useRecentTransactions } from '../hooks'
import PagedTable, { buildPageSizes } from '../../_Table/Paged'
import styles from './index.module.scss'

const PAGE_SIZES = buildPageSizes([20, 50])

const getItemKey = ({ trxHash, toAddress, slug, trxValue }) =>
  trxHash + toAddress.address + slug + trxValue

const LatestTransactions = ({ settings }) => {
  const pagesItems = useRef([]).current
  const [page, setPage] = useState(0)
  const { recentTransactions, isLoading } = useRecentTransactions(
    settings,
    page + 1
  )
  const nextRecentTransactions = useRecentTransactions(
    settings,
    page + 2,
    isLoading
  ).recentTransactions

  const items = useMemo(
    () => {
      pagesItems[page] = recentTransactions
      pagesItems[page + 1] = nextRecentTransactions
      return pagesItems.flat()
    },
    [recentTransactions, nextRecentTransactions]
  )

  return (
    <Section title='Latest transactions'>
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
    </Section>
  )
}

export default LatestTransactions
