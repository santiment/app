import React, { useMemo } from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import styles from './index.module.scss'

const noop = (_) => _

export function prepareColumns(columns) {
  columns.forEach((column) => {
    column.id = column.id || column.title
  })

  return columns
}

const Table = ({
  className,
  columns,
  items,
  itemKeyProperty,
  itemProps,
  isLoading,
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ id, title, Title }) => (
              <th key={id}>{Title ? <Title {...itemProps} /> : title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item[itemKeyProperty]}>
              {columns.map(({ id, render, className }, i) => (
                <td key={id} className={className}>
                  {render(item, itemProps, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Skeleton show={isLoading} className={styles.skeleton} />
    </div>
  )
}

Table.defaultProps = {
  items: [],
  itemProps: {},
  itemKeyProperty: 'address',
}

export default Table
