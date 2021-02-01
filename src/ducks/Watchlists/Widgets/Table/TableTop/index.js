import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Copy from '../../../Actions/Copy'
import SaveAs from '../../../Actions/SaveAs'
import DownloadCSV from '../../../Actions/DownloadCSV'
import { useUserWatchlists } from '../../../gql/hooks'
import CompareInfo from '../CompareInfo/CompareInfo'
import CompareAction from '../CompareInfo/CompareAction'
import Refresh from '../../../../../components/Refresh/Refresh'
import ProPopupWrapper from '../../../../../components/ProPopup/Wrapper'
import ExplanationTooltip from '../../../../../components/ExplanationTooltip/ExplanationTooltip'
import ColumnsToggler from '../Columns/Toggler'
import styles from './index.module.scss'

const EMPTY_OBJ = {}

const TableTop = ({
  comparingAssets,
  isLoading,
  type,
  items,
  listName,
  refetchAssets,
  activeColumns,
  updateActiveColumsKeys,
  watchlist = EMPTY_OBJ
}) => {
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now)
  const [watchlists = []] = useUserWatchlists()
  const disabledComparision = comparingAssets.length < 2

  return (
    <div className={styles.wrapper}>
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
          listTableConfig={watchlist.tableConfiguration}
          activeColumns={activeColumns}
          updateActiveColumsKeys={updateActiveColumsKeys}
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
            name={listName}
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
          lists={watchlists}
          type='watchlist'
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
