import React, { useMemo } from 'react'
import TableTop from './TableTop'
import Table from '../../../Table'
import { usePriceGraph } from './PriceGraph/hooks'
import { normalizeGraphData as normalizeData } from './PriceGraph/utils'
import { useComparingAssets } from './CompareDialog/hooks'
import styles from './index.module.scss'

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
  columns,
  toggleColumn,
  pageSize,
  pageIndex,
  sorting
}) => {
  const defaultSorting = [
    { id: sorting.metric, desc: sorting.direction === 'desc' }
  ]
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
        toggleColumn={toggleColumn}
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
            pageSizeOptions: [10, 20, 50, 100],
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

export default AssetsTable
