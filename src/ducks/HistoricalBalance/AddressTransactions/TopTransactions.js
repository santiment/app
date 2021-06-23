import React, { useRef, useMemo, useEffect, useState } from 'react'
import { COLUMNS, getItemKey } from './columns'
import { TabType } from '../defaults'
import { useAddressTransactions } from '../hooks'
import { useDistributions } from '../Address/AssetsDistribution'
import PagedTable, { buildPageSizes } from '../../_Table/Paged'
import { getProjectInfo, useProjects } from '../../../stores/projects'
import styles from './index.module.scss'

const PAGE_SIZES = buildPageSizes([20, 50])
const DEFAULT_SLUG = 'ethereum'

const ACTIVE_TAB = TabType.TOP_TRANSACTIONS

const TopTransactions = ({ settings, walletAssets }) => {
  const pagesItems = useRef([]).current
  const projects = useProjects()
  const distributions = useDistributions(walletAssets)
  const [project, setProject] = useState(null)
  const [page, setPage] = useState(0)
  const { transactions, isLoading } = useAddressTransactions(
    settings,
    ACTIVE_TAB,
    page + 1,
    false,
    project
  )
  const nextTransactions = useAddressTransactions(
    settings,
    ACTIVE_TAB,
    page + 2,
    isLoading,
    project
  ).transactions

  const items = useMemo(
    () => {
      pagesItems[page] = transactions
      pagesItems[page + 1] = nextTransactions
      return pagesItems.flat()
    },
    [transactions, nextTransactions]
  )

  useEffect(
    () => {
      const slug = distributions[0] ? distributions[0].slug : DEFAULT_SLUG
      setProject(getProjectInfo(projects, slug))
    },
    [distributions, projects]
  )

  const itemProps = useMemo(() => ({ ...settings, asset: project }), [
    settings,
    project
  ])

  return (
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
  )
}

export default TopTransactions
