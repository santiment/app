import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { PROJECT, SCREENER } from '../../../detector'
import ColumnsToggler from '../Columns/Toggler'
// import Copy from '../../../../WatchlistTable/Copy'
import CompareInfo from '../CompareInfo/CompareInfo'
import SaveAs from '../../../../WatchlistTable/SaveAs'
import CompareAction from '../CompareInfo/CompareAction'
import EditAssets from '../../../Actions/Edit/EditAssets'
import Refresh from '../../../../../components/Refresh/Refresh'
import DownloadCSV from '../../../../WatchlistTable/DownloadCSV'
import ProPopupWrapper from '../../../../../components/ProPopup/Wrapper'
import styles from './index.module.scss'

const EMPTY_OBJ = {}

const TableTop = ({
  comparingAssets,
  isLoading,
  type,
  items,
  allItems,
  refetchAssets,
  activeColumns,
  sorting,
  setOrderBy,
  updateActiveColumnsKeys,
  watchlist = EMPTY_OBJ
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
          onSave={refetchAssets}
          trigger={
            <Button border accent='positive' className={styles.addassets}>
              <Icon type='assets' className={styles.icon} />
              Add assets
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
            <CompareInfo selected={comparingAssets} />
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
        />
        <ProPopupWrapper type={type}>
          <DownloadCSV watchlist={watchlist} data={items} />
        </ProPopupWrapper>
        {/* <div className={styles.divider} /> */}
        {/* <Copy watchlist={watchlist} /> */}
        {type === SCREENER && (
          <>
            <div className={styles.divider} />
            <SaveAs watchlist={watchlist} type={PROJECT} />
          </>
        )}
      </div>
    </div>
  )
}

export default TableTop
