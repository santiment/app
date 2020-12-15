import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
// import Refresh from '../../../../../components/Refresh/Refresh'
import CompareInfo from '../CompareInfo/CompareInfo'
import CompareAction from '../CompareInfo/CompareAction'
import ProPopupWrapper from '../../../../../components/ProPopup/Wrapper'
import ExplanationTooltip from '../../../../../components/ExplanationTooltip/ExplanationTooltip'
import Copy from '../../../Actions/Copy'
import SaveAs from '../../../Actions/SaveAs'
import DownloadCSV from '../../../Actions/DownloadCSV'
import { useUserWatchlists } from '../../../gql/hooks'
import styles from './index.module.scss'

const TableTop = ({
  comparingAssets,
  cleanAll,
  isLoading,
  type,
  items,
  listName,
  watchlist = {}
}) => {
  const [watchlists = []] = useUserWatchlists()
  const disabledComparision = comparingAssets.length < 2

  return (
    <div className={styles.wrapper}>
      {/* <Refresh */}
      {/*      timestamp={timestamp} */}
      {/*      isLoading={isLoading} */}
      {/*      onRefreshClick={() => refetchAssets({ ...typeInfo, minVolume })} */}
      {/*    /> */}
      {comparingAssets && (
        <div className={styles.leftActions}>
          <div className={styles.compareAction}>
            <CompareAction
              assets={comparingAssets}
              disabledComparision={disabledComparision}
            />
          </div>

          {comparingAssets.length > 0 && (
            <CompareInfo selected={comparingAssets} cleanAll={cleanAll} />
          )}
        </div>
      )}
      <div className={styles.actions}>
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
