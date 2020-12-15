import React, { useMemo, useState } from 'react'
import { COLUMNS, DEFAULT_SORTING } from './new-columns'
import Table from '../../../Table'
import { usePriceGraph } from './PriceGraph/hooks'
import { normalizeGraphData as normalizeData } from './PriceGraph/utils'
import styles from './index.module.scss'

const AssetsTable = ({ items, loading }) => {
  const columns = useMemo(() => COLUMNS, [])
  const [visibleItems, setVisibleItems] = useState([])
  const [graphData] = usePriceGraph({ slugs: visibleItems })

  const data = useMemo(() => normalizeData(graphData, items), [
    graphData,
    items
  ])

  function onChangeVisibleItems ({ pageIndex, pageSize, rows }) {
    const startIndex = pageIndex * pageSize
    const lastIndex = startIndex + pageSize

    const visibleSlugs = rows
      .slice(startIndex, lastIndex)
      .map(({ original: { slug } }) => slug)

    if (
      visibleSlugs.length > 0 &&
      JSON.stringify(visibleSlugs) !== JSON.stringify(visibleItems)
    ) {
      setVisibleItems(visibleSlugs)
    }
  }

  return (
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
          stickyColumnIdx: 1
        },
        paginationSettings: {
          pageSize: 25,
          pageIndex: 0,
          pageSizeOptions: [10, 25, 50, 100],
          onChangeVisibleItems: onChangeVisibleItems
        }
      }}
      className={styles.tableWrapper}
      classes={{
        table: styles.table,
        bodyRow: styles.tableRow,
        pagination: styles.pagination,
        headerColumn: styles.headerColumn
      }}
    />
  )
}

export default AssetsTable
