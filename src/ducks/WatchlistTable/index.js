import React, { useMemo, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import DownloadCSV from './DownloadCSV'
import PagedTable from '../_Table/Paged'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'
import { useSelectedItemsSet } from '../_Table/hooks'
import Refresh from '../../components/Refresh/Refresh'
import EditAddresses from '../Watchlists/Actions/Edit/EditAddresses/EditAddresses'
import styles from './index.module.scss'

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN]
export const Divider = () => <div className={styles.divider} />

const WatchlistTable = ({
  watchlist,
  className,
  normalizeCSVData,
  onRefreshClick,
  ...props
}) => {
  const { items } = props
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now)
  const csvData = useMemo(() => normalizeCSVData(items), [items])

  return (
    <>
      <div className={styles.top}>
        <EditAddresses
          watchlist={watchlist}
          trigger={
            <Button border accent='positive' className={styles.add}>
              <Icon type='assets' className={styles.icon} />
              Add addresses
            </Button>
          }
        />
        <Refresh
          timestamp={refreshTimestamp}
          onRefreshClick={() =>
            setRefreshTimestamp(Date.now()) || onRefreshClick(watchlist.id)
          }
        />

        <div className={styles.actions}>
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
        controlsClassName={styles.controls}
      />
    </>
  )
}
WatchlistTable.defaultProps = {
  normalizeCSVData: _ => _
}

export default WatchlistTable
