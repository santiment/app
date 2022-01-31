import React from 'react'
import cx from 'classnames'
import { FluidSkeleton as Skeleton } from '../../components/Skeleton'
import EmptySection from '../../pages/Watchlists/EmptySection'
import { BLOCKCHAIN_ADDRESS } from '../../ducks/Watchlists/detector'
import { DesktopOnly } from '../../components/Responsive'
import styles from './index.module.scss'

export function prepareColumns (columns) {
  columns.forEach(column => {
    column.id = column.id || column.key || column.title
  })

  return columns
}

function minRowsPadding (minRows, columns, { length }) {
  if (length >= minRows) return null

  const rowsToAdd = minRows - length
  const rows = new Array(rowsToAdd)
  for (let i = 0; i < rowsToAdd; i++) {
    rows[i] = (
      <tr key={i}>
        {columns.map((_, i) => (
          <td key={i} />
        ))}
      </tr>
    )
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
  getItemKey,
  onRowClick,
  ...props
}) => (
  <table className={cx(styles.wrapper, className)}>
    <DesktopOnly>
      <thead>
        <tr>
          {columns.map(({ id, title, Title }) => (
            <th key={id}>{Title ? <Title {...itemProps} /> : title}</th>
          ))}
        </tr>
      </thead>
    </DesktopOnly>
    <tbody>
      {!isLoading && items.length === 0 && (
        <tr className={styles.disableHover}>
          <td colSpan={columns.length}>
            <EmptySection
              wrapperClassName={styles.emptyWrapper}
              type={BLOCKCHAIN_ADDRESS}
              watchlist={props.watchlist}
              refreshList={props.refreshList}
            />
          </td>
        </tr>
      )}
      {items.length > 0 && (
        <>
          {items.map((item, i) => {
            const itemIndex = offset + i
            return (
              <tr
                key={getItemKey ? getItemKey(item) : item[itemKeyProperty]}
                onClick={onRowClick && (e => onRowClick(item, e))}
              >
                {columns
                  .filter(({ id }) =>
                    props.isDesktop ? true : id !== 'CHECKBOX'
                  )
                  .map(({ id, render, className }) => (
                    <td key={id} className={className}>
                      {render(item, itemProps, itemIndex)}
                    </td>
                  ))}
              </tr>
            )
          })}
          {minRowsPadding(minRows, columns, items)}
        </>
      )}
    </tbody>
    <caption>
      <Skeleton show={isLoading} className={styles.skeleton} />
    </caption>
  </table>
)

Table.defaultProps = {
  items: [],
  itemProps: {},
  itemKeyProperty: 'id',
  minRows: 0,
  offset: 0
}

export default Table
