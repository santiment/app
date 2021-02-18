import React, { useMemo, useState } from 'react'
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
  normalizeCSVData,
  onRefreshClick,
  ...props
}) => {
  const { items } = props
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now)
  const csvData = useMemo(() => normalizeCSVData(items), [items])

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Refresh
          timestamp={refreshTimestamp}
          onRefreshClick={() =>
            setRefreshTimestamp(Date.now()) || onRefreshClick(watchlist.id)
          }
        />

        <div className={styles.actions}>
          <SaveAs
            watchlist={watchlist}
            items={items}
            createWatchlist={createWatchlist}
          />

          <Divider />

          <DownloadCSV watchlist={watchlist} data={csvData} />
        </div>
      </div>

      <PagedTable
        {...props}
        stickyPageControls
        padding
        minRows={6}
        itemProps={useSelectedItemsSet(items)}
        className={styles.table}
      />
    </div>
  )
}
WatchlistTable.defaultProps = {
  normalizeCSVData: _ => _
}

export default WatchlistTable
