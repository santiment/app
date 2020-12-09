import React from 'react'
import cx from 'classnames'
import { useTable, useSortBy } from 'react-table'
import { sortDate } from '../../utils/sortMethods'
import styles from './index.module.scss'

const Table = ({ columns, data, options = {}, className, classes = {} }) => {
  const { withSorting, ...rest } = options

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      disableSortBy: !withSorting,
      sortTypes: {
        datetime: (row1, row2, columnName) =>
          sortDate(row1.original[columnName], row2.original[columnName])
      },
      ...rest
    },
    useSortBy
  )

  return (
    <table {...getTableProps()} className={cx(styles.table, className)}>
      <thead className={cx(styles.header, classes.header)}>
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className={cx(styles.headerRow, classes.headerRow)}
          >
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={cx(
                  styles.headerColumn,
                  column.isSorted && styles.headerColumnActive,
                  classes.headerColumn
                )}
              >
                <span>{column.render('Header')}</span>
                <span
                  className={cx(
                    styles.sort,
                    column.isSortedDesc ? styles.sortDesc : styles.sortAsc
                  )}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={cx(styles.body, classes.body)}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
