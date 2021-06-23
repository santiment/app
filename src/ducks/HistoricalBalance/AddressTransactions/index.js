import React, { useRef, useMemo, useEffect, useState } from 'react'
import { COLUMNS } from './columns'
import Section from '../Section'
import { TabType } from '../defaults'
import Tab from '../../../components/Tab'
import { useAddressTransactions } from '../hooks'
import { useDistributions } from '../Address/AssetsDistribution'
import PagedTable, { buildPageSizes } from '../../_Table/Paged'
import { getProjectInfo, useProjects } from '../../../stores/projects'
import styles from './index.module.scss'

const PAGE_SIZES = buildPageSizes([20, 50])
const DEFAULT_SLUG = 'ethereum'

const getItemKey = ({ trxHash }) => trxHash

const Tabs = ({ tabState }) => (
  <>
    <Tab tab={TabType.LATEST_TRANSACTIONS} tabState={tabState} />
    <Tab tab={TabType.TOP_TRANSACTIONS} tabState={tabState} />
  </>
)

const AddressTransactions = ({ settings, walletAssets }) => {
  const pagesItems = useRef({
    [TabType.LATEST_TRANSACTIONS]: [],
    [TabType.TOP_TRANSACTIONS]: []
  }).current
  const tabState = useState(TabType.LATEST_TRANSACTIONS)
  const activeTab = tabState[0]
  const projects = useProjects()
  const distributions = useDistributions(walletAssets)
  const [project, setProject] = useState(null)
  const [page, setPage] = useState(0)
  const { transactions, isLoading } = useAddressTransactions(
    settings,
    activeTab,
    page + 1,
    false,
    project
  )
  const nextTransactions = useAddressTransactions(
    settings,
    activeTab,
    page + 2,
    isLoading,
    project
  ).transactions

  const items = useMemo(
    () => {
      pagesItems[activeTab][page] = transactions
      pagesItems[activeTab][page + 1] = nextTransactions
      return pagesItems[activeTab].flat()
    },
    [transactions, nextTransactions, activeTab]
  )

  useEffect(
    () => {
      setPage(0)
    },
    [activeTab]
  )
  useEffect(
    () => {
      if (activeTab === TabType.LATEST_TRANSACTIONS) {
        setProject(null)
      } else {
        const slug = distributions[0] ? distributions[0].slug : DEFAULT_SLUG
        setProject(getProjectInfo(projects, slug))
      }
    },
    [distributions, projects]
  )

  const itemProps = useMemo(() => ({ ...settings, asset: project }), [
    settings,
    project
  ])

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
          itemProps={itemProps}
          isLoading={isLoading}
          onPageChange={setPage}
          getItemKey={getItemKey}
        />
      )}
    </Section>
  )
}

export default AddressTransactions
