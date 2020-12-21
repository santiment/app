import React from 'react'
import { useSelectedItemsSet } from '../../../ducks/_Table/hooks'
import { COLUMNS } from './columns'
import WatchlistTable from '../../../ducks/WatchlistTable'
import styles from '../index.module.scss'

const Table = ({ items, ...props }) => {
  return (
    <WatchlistTable
      {...props}
      items={items}
      className={styles.table}
      columns={COLUMNS}
      itemKeyProperty='address'
      itemProps={useSelectedItemsSet(items)}
    />
  )
}

export default Table
