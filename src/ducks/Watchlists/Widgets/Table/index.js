import React, { useState, useMemo, useEffect } from 'react'
import TableTop from './TableTop'
import Table from '../../../Table'
import { usePriceGraph } from './PriceGraph/hooks'
import { normalizeGraphData as normalizeData } from './PriceGraph/utils'
import { useComparingAssets } from './CompareDialog/hooks'
import { DEFAULT_COLUMNS } from './Columns/defaults'
import { PROJECT } from '../../detector'
import styles from './index.module.scss'

const DEFAULT_ITEMS = []
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

const price_usd_chart_1d = 'price_usd_chart_1d'
const price_usd_chart_7d = 'price_usd_chart_7d'
const price_usd_chart_30d = 'price_usd_chart_30d'

const hasColumn = (columns, key) =>
  columns.find(({ accessor }) => accessor === key)

const AssetsTable = ({
  items,
  allItems,
  loading,
  type,
  watchlist,
  refetchAssets,
  onChangePage,
  fetchData,
  projectsCount,
  pageSize,
  pageIndex,
  sorting,
  activeColumns,
  setOrderBy,
  updateActiveColumnsKeys,
  fetchAllColumns
}) => {
  const [toggleSelected, setToggleSelected] = useState()
  const defaultSorting = useMemo(
    () => [{ id: sorting.metric, desc: sorting.direction === 'desc' }],
    [sorting]
  )
  const columns = useMemo(() => [...DEFAULT_COLUMNS, ...activeColumns], [
    activeColumns
  ])
  const { comparingAssets = [], updateAssets } = useComparingAssets()
  const slugs = useMemo(() => items.map(({ slug }) => slug), [items])

  const [graphData1d] = usePriceGraph({
    slugs,
    range: '1d',
    skip: !hasColumn(activeColumns, price_usd_chart_1d)
  })
  const [graphData7d] = usePriceGraph({
    slugs,
    range: '7d',
    skip: !hasColumn(activeColumns, price_usd_chart_7d)
  })
  const [graphData30d] = usePriceGraph({
    slugs,
    range: '30d',
    skip: !hasColumn(activeColumns, price_usd_chart_30d)
  })

  const data = useMemo(() => {
    let result = normalizeData(graphData1d, items, price_usd_chart_1d)
    result = normalizeData(graphData7d, result, price_usd_chart_7d)
    result = normalizeData(graphData30d, result, price_usd_chart_30d)

    return result
  }, [graphData7d, graphData1d, graphData30d, items])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("tableRowsCountChanged", {detail: data.length}))
  }, [data])

  return (
    <>
      <TableTop
        refetchAssets={refetchAssets}
        fetchAllColumns={fetchAllColumns}
        comparingAssets={comparingAssets}
        type={type}
        allItems={allItems}
        watchlist={watchlist}
        isLoading={loading}
        sorting={sorting}
        setOrderBy={setOrderBy}
        activeColumns={activeColumns}
        updateActiveColumnsKeys={updateActiveColumnsKeys}
        toggleSelected={toggleSelected}
      />
      <Table
        data={data}
        columns={columns}
        fetchData={fetchData}
        options={{
          noDataSettings: {
            skipNoData: type === PROJECT,
            title: 'No matches!',
            description:
              "The assets for the filter which you applying weren't found. Check if it's correct or try another filter settings."
          },
          loadingSettings: {
            repeatLoading: allItems && allItems.length === 0 ? 0 : 30,
            isLoading: loading && items.length === 0
          },
          sortingSettings: {
            defaultSorting,
            allowSort: true
          },
          stickySettings: {
            isStickyHeader: true,
            isStickyColumn: true,
            stickyColumnIdx: 2
          },
          paginationSettings: {
            pageSize,
            pageIndex,
            onChangePage,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            controlledPageCount: Math.ceil(projectsCount / pageSize),
            manualPagination: true
          },
          rowSelectSettings: {
            onChangeSelectedRows: updateAssets
          }
        }}
        className={styles.tableWrapper}
        classes={{
          table: styles.table,
          bodyRow: styles.tableRow,
          pagination: styles.pagination,
          headerColumn: styles.headerColumn,
          bodyColumn: styles.bodyColumn
        }}
        onToggle={toggleFunction => setToggleSelected(() => toggleFunction)}
      />
    </>
  )
}

AssetsTable.defaultProps = {
  items: DEFAULT_ITEMS
}

export default AssetsTable
