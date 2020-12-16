import React, { useMemo } from 'react'
import { COLUMNS, DEFAULT_SORTING } from './new-columns'
import TableTop from './TableTop'
import Table from '../../../Table'
import { useVisibleItems } from './hooks'
import { usePriceGraph } from './PriceGraph/hooks'
import { normalizeGraphData as normalizeData } from './PriceGraph/utils'
import { useComparingAssets } from '../../../../ducks/Watchlists/Widgets/Table/CompareDialog/hooks'
import styles from './index.module.scss'

const AssetsTable = ({ items, loading, type, listName, watchlist }) => {
  const { visibleItems, changeVisibleItems } = useVisibleItems()
  const { comparingAssets = [], updateAssets, cleanAll } = useComparingAssets()
  const [graphData] = usePriceGraph({ slugs: visibleItems })

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => normalizeData(graphData, items), [
    graphData,
    items
  ])

  return (
    <>
      <TableTop
        comparingAssets={comparingAssets}
        cleanAll={cleanAll}
        type={type}
        listName={listName}
        items={items}
        watchlist={watchlist}
        isLoading={loading}
      />
      <Table
        data={data}
        columns={columns}
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
            defaultSorting: DEFAULT_SORTING,
            allowSort: true
          },
          stickySettings: {
            isStickyHeader: true,
            isStickyColumn: true,
            stickyColumnIdx: 2
          },
          paginationSettings: {
            pageSize: 25,
            pageIndex: 0,
            pageSizeOptions: [10, 25, 50, 100],
            onChangeVisibleItems: changeVisibleItems
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
