import React, { useMemo, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import DownloadCSV from './DownloadCSV'
import PagedTable from '../_Table/Paged'
import { useSelectedItemsSet } from '../_Table/hooks'
import Refresh from '../../components/Refresh/Refresh'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import EmptySection from '../../pages/Watchlists/EmptySection'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector'
import ColumnsToggler from '../Watchlists/Widgets/Table/Columns/Toggler'
import EditAddresses from '../Watchlists/Actions/Edit/EditAddresses/EditAddresses'
import Actions from '../Watchlists/Widgets/Table/CompareInfo/Actions'
import { updateWatchlistShort } from '../../ducks/Watchlists/gql/list/mutations'
import { mapAddressToAPIType } from '../Watchlists/utils'
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
  const selectedItemsSet = useSelectedItemsSet(items)
  const refreshList = (onRefreshDone) =>
    onRefreshClick(watchlist.id, () => {
      setRefreshTimestamp(Date.now())
      typeof onRefreshDone === 'function' && onRefreshDone()
    })

  return (
    <>
      <DesktopOnly>
        <div className={styles.top}>
          <EditAddresses
            watchlist={watchlist}
            refreshList={refreshList}
            trigger={
              <Button border accent='positive' className={styles.add}>
                <Icon type='assets' className={styles.icon} />
                Edit addresses
              </Button>
            }
          />
          <Refresh timestamp={refreshTimestamp} onRefreshClick={refreshList} />

          {selectedItemsSet.selectedItemsSet.size > 0 && (
            <div className={styles.ml1}>
              <Actions
                assets={watchlist.listItems}
                selected={Array.from(selectedItemsSet.selectedItemsSet)}
                watchlist={watchlist}
                onAdd={(watchlistId, _, onAddDone) =>
                  updateWatchlistShort({
                    id: watchlistId,
                    listItems: items.map((a) => mapAddressToAPIType(a)),
                  }).then(() => refreshList(onAddDone))
                }
                onRemove={(watchlistId, listItems, onRemoveDone) => {
                  const addresses = listItems.map((l) => l.address)
                  const removeItems = items.filter((l) => !addresses.includes(l.address))
                  return updateWatchlistShort({
                    id: watchlistId,
                    listItems: removeItems.map((a) => mapAddressToAPIType(a)),
                  }).then(() => refreshList(onRemoveDone))
                }}
              />
            </div>
          )}

          <div className={styles.actions}>
            <ColumnsToggler
              type={BLOCKCHAIN_ADDRESS}
              watchlist={watchlist}
              activeColumns={activeColumns}
              updateActiveColumnsKeys={updateActiveColumnsKeys}
            />
            <DownloadCSV type={BLOCKCHAIN_ADDRESS} watchlist={watchlist} data={csvData} />
          </div>
        </div>
      </DesktopOnly>

      <MobileOnly>
        <MobileHeader
          showBack={true}
          title={watchlist.name}
          backRoute='/watchlists'
          showSearch={false}
          classes={{ title: styles.title }}
          rightActions={
            <EditAddresses
              watchlist={watchlist}
              refreshList={refreshList}
              trigger={
                <Button>
                  <Icon type='edit' />
                </Button>
              }
            />
          }
        />
      </MobileOnly>

      <PagedTable
        {...props}
        stickyPageControls
        padding
        itemProps={selectedItemsSet}
        className={styles.table}
        controlsClassName={styles.controls}
        watchlist={watchlist}
        refreshList={refreshList}
        isWithColumnTitles={props.isDesktop}
        emptySection={
          <EmptySection
            wrapperClassName={styles.emptyWrapper}
            type={BLOCKCHAIN_ADDRESS}
            watchlist={watchlist}
            refreshList={refreshList}
          />
        }
        minRows={8}
      />
    </>
  )
}
WatchlistTable.defaultProps = {
  normalizeCSVData: (_) => _,
}

export default WatchlistTable
