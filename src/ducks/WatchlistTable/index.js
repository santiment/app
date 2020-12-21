import React from 'react'
import cx from 'classnames'
/* import Copy from './Copy' */
import SaveAs from './SaveAs'
import DownloadCSV from './DownloadCSV'
import PagedTable from '../_Table/Paged'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'
import { useSelectedItemsSet } from '../_Table/hooks'
import Refresh from '../../components/Refresh/Refresh'
import styles from './index.module.scss'

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN]
export const Divider = () => <div className={styles.divider} />

const WatchlistTable = ({
  watchlist,
  className,
  createWatchlist,
  ...props
}) => {
  const { items } = props

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Refresh timestamp={Date.now()} />

        <div className={styles.actions}>
          {/* <Copy watchlist={watchlist} />

          <Divider /> */}

          <SaveAs
            watchlist={watchlist}
            items={items}
            createWatchlist={createWatchlist}
          />

          <Divider />

          <DownloadCSV />
        </div>
      </div>

      <PagedTable
        {...props}
        itemProps={useSelectedItemsSet(items)}
        className={cx(styles.table)}
      />
    </div>
  )
}

export default WatchlistTable
