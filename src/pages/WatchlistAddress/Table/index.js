import React, { useMemo } from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import styles from './index.module.scss'

const noop = _ => _

export function prepareColumns (columns) {
  columns.forEach(column => {
    column.id = column.id || column.title
  })

  return columns
}

const Table = ({
  className,
  columns,
  items,
  itemKeyProperty,
  itemAccessor,
  isLoading
}) => {
  const _items = useMemo(
    () => (itemAccessor === noop ? items : items.map(itemAccessor)),
    [items]
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ id, title }) => (
              <th key={id}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_items.map(item => (
            <tr key={item[itemKeyProperty]}>
              {columns.map(({ id, render, className }, i) => (
                <td key={id} className={className}>
                  {render(item, i)}
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
  itemAccessor: noop,
  itemKeyProperty: 'address'
}

export default Table
