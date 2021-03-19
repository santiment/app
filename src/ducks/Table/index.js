import React, { useEffect } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import { sortDate } from '../../utils/sortMethods'
import Loader from './Loader'
import NoData from './NoData'
import Pagination from './Pagination'
import { CHECKBOX_COLUMN } from './Checkbox/column'
import { sortFloatNumeric } from './utils'
import styles from './index.module.scss'

const DEFAULT_CB = () => {}
const EMPTY_OBJ = {}
const PAGE_SIZE_OPTIONS = [10, 25, 50]
const sortTypes = {
  datetime: (a, b, id) => sortDate(a.original[id], b.original[id]),
  floatNumeric: (a, b, id) => sortFloatNumeric(a.original[id], b.original[id])
}

const Table = ({
  data,
  columns,
  fetchData = DEFAULT_CB,
  options: {
    noDataSettings = EMPTY_OBJ,
    loadingSettings,
    sortingSettings,
    stickySettings,
    paginationSettings,
    rowSelectSettings
  } = EMPTY_OBJ,
  className,
  classes = EMPTY_OBJ
}) => {
  const { isLoading, repeatLoading } = loadingSettings || EMPTY_OBJ
  const { allowSort, defaultSorting } = sortingSettings || EMPTY_OBJ
  const { isStickyHeader, isStickyColumn, stickyColumnIdx = null } =
    stickySettings || EMPTY_OBJ
  const {
    pageSize: initialPageSize,
    pageIndex: initialPageIndex = 0,
    onChangePage = null,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    controlledPageCount,
    manualPagination
  } = paginationSettings || EMPTY_OBJ
  const { onChangeSelectedRows } = rowSelectSettings || EMPTY_OBJ
  const initialState = EMPTY_OBJ
  const optionalOptions = EMPTY_OBJ

  if (defaultSorting) {
    initialState.sortBy = defaultSorting
  }

  if (initialPageSize) {
    initialState.pageSize = initialPageSize
  }

  if (initialPageIndex) {
    initialState.pageIndex = initialPageIndex
  }

  if (manualPagination) {
    optionalOptions.manualPagination = true
    optionalOptions.manualSortBy = true
    optionalOptions.pageCount = controlledPageCount
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setSortBy,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data,
      useControlledState: state => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: manualPagination ? initialPageIndex : state.pageIndex
          }),
          [state, initialPageIndex]
        )
      },
      disableSortRemove: true,
      disableSortBy: !allowSort,
      sortTypes,
      autoResetPage: false,
      autoResetSortBy: false,
      initialState,
      ...optionalOptions
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns =>
        rowSelectSettings ? [CHECKBOX_COLUMN, ...columns] : columns
      )
    }
  )

  const content = paginationSettings ? page : rows
  const paginationParams = {
    pageSize,
    pageIndex,
    pageOptions,
    canNextPage,
    canPreviousPage,
    setPageSize,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    pageSizeOptions
  }

  useEffect(
    () => {
      if (onChangeSelectedRows) {
        onChangeSelectedRows(selectedFlatRows)
      }
    },
    [selectedFlatRows]
  )

  useEffect(
    () => {
      fetchData({ pageSize, sortBy })
    },
    [pageSize, sortBy]
  )

  useEffect(
    () => {
      if (manualPagination && !isEqual(defaultSorting, sortBy)) {
        setSortBy(defaultSorting)
      }
    },
    [defaultSorting]
  )

  useEffect(
    () => {
      if (!manualPagination) {
        setSortBy(sortBy)
      }
    },
    [sortBy]
  )

  return (
    <div
      className={cx(
        styles.wrapper,
        !paginationSettings && styles.wrapperOverflow,
        className
      )}
    >
      <table {...getTableProps()} className={cx(styles.table, classes.table)}>
        <thead className={cx(styles.header, classes.header)}>
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={classes.headerRow}
            >
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({ title: '' })
                  )}
                  className={cx(
                    styles.headerColumn,
                    column.collapse && styles.collapse,
                    column.isSorted && styles.headerColumnActive,
                    isStickyHeader && styles.headerColumnStickyTop,
                    isStickyColumn &&
                      stickyColumnIdx === idx &&
                      styles.headerColumnStickyLeft,
                    classes.headerColumn
                  )}
                >
                  <span>{column.render('Header')}</span>
                  {column.canSort && (
                    <span
                      className={cx(
                        styles.sort,
                        column.isSortedDesc ? styles.sortDesc : styles.sortAsc
                      )}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className={cx(styles.body, classes.body)}
        >
          {content.map(row => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className={cx(styles.bodyRow, classes.bodyRow)}
              >
                {row.cells.map((cell, idx) => (
                  <td
                    {...cell.getCellProps()}
                    className={cx(
                      styles.bodyColumn,
                      cell.column.collapse && styles.collapse,
                      isStickyColumn &&
                        stickyColumnIdx === idx &&
                        styles.bodyColumnSticky,
                      classes.bodyColumn
                    )}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      {!!loadingSettings && repeatLoading > 0 && (
        <Loader
          repeat={repeatLoading}
          isLoading={isLoading}
          classes={{ wrapper: classes.loader, row: classes.loaderRow }}
        />
      )}
      {!!loadingSettings && !isLoading && data.length === 0 && (
        <NoData {...noDataSettings} />
      )}
      {!!paginationSettings && (
        <Pagination
          {...paginationParams}
          onChangePage={onChangePage}
          className={classes.pagination}
        />
      )}
    </div>
  )
}

export default Table
