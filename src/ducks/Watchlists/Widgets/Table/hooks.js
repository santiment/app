import { useCallback, useMemo, useState } from 'react'
import { getColumns } from './Columns/builder'
import { DEFAULT_ORDER_BY, DIRECTIONS } from './Columns/defaults'

const pageSize = 20
const EMPTY_ARRAY = []

export function useColumns () {
  const defaultPagination = { page: 1, pageSize: +pageSize }
  const [pagination, setPagination] = useState(defaultPagination)
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY)
  const [activeColumnsKeys, setActiveColumnsKeys] = useState(EMPTY_ARRAY)
  const activeColumns = useMemo(() => getColumns(activeColumnsKeys), [
    activeColumnsKeys
  ])

  const fetchData = useCallback(
    ({ pageSize, sortBy }) => {
      const { id, desc } = sortBy[0]
      const activeColumn = activeColumns.find(column => column.key === id)
      if (!activeColumn) {
        setOrderBy(DEFAULT_ORDER_BY)
      } else {
        const { timeRange, aggregation } = activeColumn
        const newDirection = desc ? DIRECTIONS.DESC : DIRECTIONS.ASC
        setOrderBy({
          metric: id,
          aggregation,
          dynamicTo: 'now',
          dynamicFrom: timeRange,
          direction: newDirection
        })
      }
      setPagination({ ...pagination, pageSize: +pageSize })
    },
    [activeColumns]
  )

  return {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys
  }
}
