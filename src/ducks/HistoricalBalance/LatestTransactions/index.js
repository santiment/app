import React, { useRef, useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import Section from '../Section'
import { useRecentTransactions } from '../hooks'
import PagedTable from '../../_Table/Paged'
import styles from './index.module.scss'

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
        itemKeyProperty='trxHash'
        items={items}
        isLoading={isLoading}
        minRows={10}
        itemProps={settings}
        onPageChange={setPage}
      />
    </Section>
  )
}

export default LatestTransactions
