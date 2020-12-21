import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../components/Skeleton'
import styles from './index.module.scss'

export function prepareColumns (columns) {
  columns.forEach(column => {
    column.id = column.id || column.title
  })

  return columns
}

const Table = ({
  className,
  offset,
  columns,
  items,
  itemKeyProperty,
  itemProps,
  isLoading
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
          <tr key={item[itemKeyProperty]}>
            {columns.map(({ id, render, className }) => (
              <td key={id} className={className}>
                {render(item, itemProps, itemIndex)}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
    <caption>
      <Skeleton show={isLoading} className={styles.skeleton} />
    </caption>
  </table>
)

Table.defaultProps = {
  items: [],
  itemProps: {},
  itemKeyProperty: 'id'
}

export default Table
