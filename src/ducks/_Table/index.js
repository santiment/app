import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../components/Skeleton'
import NoDataImage from '../../components/Illustrations/NoData'
import styles from './index.module.scss'

export function prepareColumns (columns) {
  columns.forEach(column => {
    column.id = column.id || column.title
  })

  return columns
}

function minRowsPadding (minRows, { length }) {
  if (length >= minRows) return null

  const rowsToAdd = minRows - length
  const rows = new Array(rowsToAdd)
  for (let i = 0; i < rowsToAdd; i++) {
    rows[i] = <tr key={i} />
  }
  return rows
}

const Table = ({
  className,
  offset,
  columns,
  minRows,
  items,
  itemKeyProperty,
  itemProps,
  isLoading,
  getItemKey
}) => (
  <table className={cx(styles.wrapper, className)}>
    <thead>
      <tr>
        {columns.map(({ id, title, Title }) => (
          <th key={id}>{Title ? <Title {...itemProps} /> : title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {items.map((item, i) => {
        const itemIndex = offset + i
        return (
          <tr key={getItemKey ? getItemKey(item) : item[itemKeyProperty]}>
            {columns.map(({ id, render, className }) => (
              <td key={id} className={className}>
                {render(item, itemProps, itemIndex)}
              </td>
            ))}
          </tr>
        )
      })}
      {minRowsPadding(minRows, items)}
    </tbody>
    <caption>
      <Skeleton show={isLoading} className={styles.skeleton} />
      {!isLoading && items.length === 0 && (
        <NoDataImage className={styles.nodata} />
      )}
    </caption>
  </table>
)

Table.defaultProps = {
  items: [],
  itemProps: {},
  itemKeyProperty: 'id',
  minRows: 0
}

export default Table
