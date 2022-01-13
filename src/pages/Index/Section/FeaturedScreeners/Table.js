import React, { useMemo, useEffect } from 'react'
import { useColumns } from '../../../../ducks/Watchlists/Widgets/Table/hooks'
import { DEFAULT_COLUMNS } from '../../../../ducks/Watchlists/Widgets/Table/Columns/defaults'
import ScreenerTable from '../../../../ducks/Table'
import { buildFunctionQuery } from '../../../../ducks/Watchlists/Widgets/Filter/utils'
import { getProjectsByFunction } from '../../../../ducks/Watchlists/gql/hooks'
import { DYNAMIC_COLUMNS, pagination } from './utils'
import styles from './index.module.scss'

const Table = ({ screener }) => {
  const {
    orderBy,
    setOrderBy,
    activeColumns,
    setActiveColumnsKeys
  } = useColumns()

  useEffect(() => {
    if (screener.tableConfiguration) {
      const { sorting } = screener.tableConfiguration.columns
      sorting && setOrderBy(sorting)
    }
    setActiveColumnsKeys(DYNAMIC_COLUMNS)
  }, [screener])

  const { assets } = getProjectsByFunction(
    ...buildFunctionQuery({
      fn: screener.function,
      pagination,
      orderBy,
      activeColumns
    })
  )

  const defaultSorting = useMemo(
    () => [{ id: orderBy.metric, desc: orderBy.direction === 'desc' }],
    [orderBy]
  )

  const shownColumns = useMemo(() => [...DEFAULT_COLUMNS, ...activeColumns], [
    activeColumns
  ])

  return (
    <ScreenerTable
      data={assets}
      columns={shownColumns}
      className={styles.table}
      options={{
        sortingSettings: {
          defaultSorting,
          allowSort: false
        },
        paginationSettings: {
          pageSize: assets.length,
          controlledPageCount: 1,
          manualPagination: true
        }
      }}
    />
  )
}

export default Table
