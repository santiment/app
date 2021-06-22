import React, { useRef, useMemo, useEffect, useState } from 'react'
import { COLUMNS } from './columns'
import Section from '../Section'
import { TabType } from '../defaults'
import Tab from '../../../components/Tab'
import { useAddressTransactions } from '../hooks'
import PagedTable, { buildPageSizes } from '../../_Table/Paged'
import styles from './index.module.scss'

const PAGE_SIZES = buildPageSizes([20, 50])

const getItemKey = ({ trxHash, toAddress, slug, trxValue }) =>
  trxHash + toAddress.address + slug + trxValue

const Tabs = ({ tabState }) => (
  <>
    <Tab tab={TabType.LATEST_TRANSACTIONS} tabState={tabState} />
    <Tab tab={TabType.TOP_TRANSACTIONS} tabState={tabState} />
  </>
)

const AddressTransactions = ({ settings }) => {
  const pagesItems = useRef([]).current
  const tabState = useState(TabType.LATEST_TRANSACTIONS)
  const activeTab = tabState[0]
  const [page, setPage] = useState(0)
  const { transactions, isLoading } = useAddressTransactions(
    settings,
    activeTab,
    page + 1
  )
  const nextTransactions = useAddressTransactions(settings, activeTab, page + 2)
    .transactions

  const items = useMemo(
    () => {
      pagesItems[page] = transactions
      pagesItems[page + 1] = nextTransactions
      return pagesItems.flat()
    },
    [transactions, nextTransactions]
  )

  useEffect(() => setPage(0), [activeTab])

  return (
    <Section title={<Tabs tabState={tabState} />}>
      {activeTab === TabType.LATEST_TRANSACTIONS ? (
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
      ) : (
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
      )}
    </Section>
  )
}

export default AddressTransactions
