import React from 'react'
import cx from 'classnames'
import Copy from './Copy'
import SaveAs from './SaveAs'
import DownloadCSV from './DownloadCSV'
import PagedTable from '../_Table/Paged'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'
import styles from './index.module.scss'
import Refresh from '../../components/Refresh/Refresh'

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN]
export const Divider = () => <div className={styles.divider} />

const WatchlistTable = ({ watchlist, className, ...props }) => {
  const { items } = props

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Refresh timestamp={Date.now()} />

        <div className={styles.actions}>
          <Copy watchlist={watchlist} />

          <Divider />

          <SaveAs watchlist={watchlist} items={items} />

          <Divider />

          <DownloadCSV />
        </div>
      </div>

      <PagedTable {...props} className={cx(styles.table)} />
    </div>
  )
}

export default WatchlistTable
