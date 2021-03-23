import React, { useMemo } from 'react'
import TableTop from './TableTop'
import Table from '../../../Table'
import { usePriceGraph } from './PriceGraph/hooks'
import { normalizeGraphData as normalizeData } from './PriceGraph/utils'
import { useComparingAssets } from './CompareDialog/hooks'
import { DEFAULT_COLUMNS } from './Columns/defaults'
import styles from './index.module.scss'

const DEFAULT_ITEMS = []
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

const AssetsTable = ({
  items = [],
  loading,
  type,
  listName,
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
  updateActiveColumnsKeys
}) => {
  const defaultSorting = useMemo(
    () => [{ id: sorting.metric, desc: sorting.direction === 'desc' }],
    [sorting]
  )
  const columns = useMemo(() => [...DEFAULT_COLUMNS, ...activeColumns], [
    activeColumns
  ])
  const { comparingAssets = [], updateAssets } = useComparingAssets()
  const slugs = useMemo(() => items.map(({ slug }) => slug), [items])
  const [graphData] = usePriceGraph({ slugs })
  const data = useMemo(() => normalizeData(graphData, items), [
    graphData,
    items
  ])

  return (
    <>
      <TableTop
        refetchAssets={refetchAssets}
        comparingAssets={comparingAssets}
        type={type}
        listName={listName}
        items={items}
        watchlist={watchlist}
        isLoading={loading}
        columns={columns}
        sorting={sorting}
        setOrderBy={setOrderBy}
        activeColumns={activeColumns}
        updateActiveColumnsKeys={updateActiveColumnsKeys}
      />
      <Table
        data={data}
        columns={columns}
        fetchData={fetchData}
        options={{
          noDataSettings: {
            title: 'No matches!',
            description:
              "The assets for the filter which you applying weren't found. Check if it's correct or try another filter settings."
          },
          loadingSettings: {
            repeatLoading: 30,
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
      />
    </>
  )
}

AssetsTable.defaultProps = {
  items: DEFAULT_ITEMS
}

export default AssetsTable
