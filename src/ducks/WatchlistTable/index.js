import React, { useMemo, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import DownloadCSV from './DownloadCSV'
import PagedTable from '../_Table/Paged'
import { useSelectedItemsSet } from '../_Table/hooks'
import Refresh from '../../components/Refresh/Refresh'
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector'
import ColumnsToggler from '../Watchlists/Widgets/Table/Columns/Toggler'
import EditAddresses from '../Watchlists/Actions/Edit/EditAddresses/EditAddresses'
import styles from './index.module.scss'

export const Divider = () => <div className={styles.divider} />

const WatchlistTable = ({
  watchlist,
  className,
  activeColumns,
  updateActiveColumnsKeys,
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
              Edit addresses
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
          <ColumnsToggler
            type={BLOCKCHAIN_ADDRESS}
            watchlist={watchlist}
            activeColumns={activeColumns}
            updateActiveColumnsKeys={updateActiveColumnsKeys}
          />
          <DownloadCSV
            type={BLOCKCHAIN_ADDRESS}
            watchlist={watchlist}
            data={csvData}
          />
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
