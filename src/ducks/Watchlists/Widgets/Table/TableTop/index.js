import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Copy from '../../../Actions/Copy'
import { PROJECT } from '../../../detector'
import SaveAs from '../../../Actions/SaveAs'
import ColumnsToggler from '../Columns/Toggler'
import CompareInfo from '../CompareInfo/CompareInfo'
import { useIsAuthor } from '../../../gql/list/hooks'
import DownloadCSV from '../../../Actions/DownloadCSV'
import CompareAction from '../CompareInfo/CompareAction'
import EditAssets from '../../../Actions/Edit/EditAssets'
import Refresh from '../../../../../components/Refresh/Refresh'
import ProPopupWrapper from '../../../../../components/ProPopup/Wrapper'
import ExplanationTooltip from '../../../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

const EMPTY_OBJ = {}

const TableTop = ({
  comparingAssets,
  isLoading,
  type,
  items,
  refetchAssets,
  activeColumns,
  sorting,
  setOrderBy,
  updateActiveColumnsKeys,
  watchlist = EMPTY_OBJ
}) => {
  const { isAuthor } = useIsAuthor(watchlist)
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now)
  const disabledComparision = comparingAssets.length < 2

  return (
    <div className={styles.wrapper}>
      <EditAssets
        name={watchlist.name}
        id={watchlist.id}
        watchlist={watchlist}
        assets={items}
        trigger={
          <Button border accent='positive' className={styles.addassets}>
            <Icon type='assets' className={styles.icon} />
            Add assets
          </Button>
        }
      />
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
          watchlist={watchlist}
          isAuthor={isAuthor}
          sorting={sorting}
          setOrderBy={setOrderBy}
          activeColumns={activeColumns}
          updateActiveColumnsKeys={updateActiveColumnsKeys}
        />
        <ProPopupWrapper
          type={type}
          trigger={props => (
            <div
              {...props}
              className={cx(styles.action__wrapper, styles.action__withLine)}
            >
              <ExplanationTooltip
                text='Download .csv'
                offsetY={10}
                className={styles.action__tooltip}
              >
                <Icon type='save' className={styles.action} />
              </ExplanationTooltip>
            </div>
          )}
        >
          <DownloadCSV
            name={watchlist.name}
            items={items}
            className={cx(styles.action, styles.action__withLine)}
            isLoading={isLoading}
          >
            <ExplanationTooltip
              text='Download .csv'
              offsetY={10}
              className={styles.action__tooltip}
            >
              <Icon type='save' />
            </ExplanationTooltip>
          </DownloadCSV>
        </ProPopupWrapper>
        <Copy
          id={watchlist.id}
          trigger={
            <div className={cx(styles.action, styles.action__withLine)}>
              <ExplanationTooltip
                text='Copy assets to watchlist'
                offsetY={10}
                className={styles.action__tooltip}
              >
                <Icon type='copy' />
              </ExplanationTooltip>
            </div>
          }
        />
        <SaveAs
          watchlist={watchlist}
          type={PROJECT}
          trigger={
            <div className={cx(styles.action, styles.action__saveAs)}>
              <ExplanationTooltip
                text='Save as watchlist'
                offsetY={10}
                className={styles.action__tooltip}
              >
                <Icon type='add-watchlist' />
              </ExplanationTooltip>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default TableTop
