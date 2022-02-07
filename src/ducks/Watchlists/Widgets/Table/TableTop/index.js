import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { PROJECT } from '../../../detector'
import ColumnsToggler from '../Columns/Toggler'
import CompareInfo from '../CompareInfo/CompareInfo'
import CompareAction from '../CompareInfo/CompareAction'
import EditAssets from '../../../Actions/Edit/EditAssets'
import Refresh from '../../../../../components/Refresh/Refresh'
import DownloadCSV from '../../../../WatchlistTable/DownloadCSV'
import styles from './index.module.scss'

const EMPTY_OBJ = {}

const TableTop = ({
  refetchAssets,
  fetchAllColumns,
  comparingAssets,
  type,
  allItems,
  watchlist = EMPTY_OBJ,
  isLoading,
  sorting,
  setOrderBy,
  activeColumns,
  updateActiveColumnsKeys,
  toggleSelected
}) => {
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now)
  const disabledComparision = comparingAssets.length < 2

  return (
    <div className={styles.wrapper}>
      {type === PROJECT && (
        <EditAssets
          name={watchlist.name}
          id={watchlist.id}
          watchlist={watchlist}
          assets={allItems}
          onSave={onRefetchDone => refetchAssets(onRefetchDone)}
          trigger={
            <Button border accent='positive' className={styles.addassets}>
              <Icon type='assets' className={styles.icon} />
              Edit assets
            </Button>
          }
        />
      )}
      <Refresh
        timestamp={refreshTimestamp}
        isLoading={isLoading}
        onRefreshClick={() =>
          setRefreshTimestamp(Date.now()) || refetchAssets()
        }
      />
      {comparingAssets && (
        <div className={styles.leftActions}>
          <div className={styles.compareAction}>
            <CompareAction
              assets={comparingAssets}
              disabledComparision={disabledComparision}
            />
          </div>
          {comparingAssets.length > 0 && (
            <CompareInfo
              type={type}
              selected={comparingAssets}
              watchlist={watchlist}
              refetchAssets={refetchAssets}
              cleanAll={() => toggleSelected(false)}
            />
          )}
        </div>
      )}
      <div className={styles.actions}>
        <ColumnsToggler
          type={type}
          sorting={sorting}
          watchlist={watchlist}
          setOrderBy={setOrderBy}
          activeColumns={activeColumns}
          updateActiveColumnsKeys={updateActiveColumnsKeys}
          flexible={false}
        />
        <DownloadCSV
          type={type}
          watchlist={watchlist}
          downloadData={fetchAllColumns}
        />
      </div>
    </div>
  )
}

export default TableTop
