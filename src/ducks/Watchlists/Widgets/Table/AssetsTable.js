import React, { useState, useCallback, useEffect, useMemo } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import 'react-table/react-table.css'
import {
  ASSETS_FETCH,
  WATCHLIST_TOGGLE_COLUMNS
} from '../../../../actions/types'
import Refresh from '../../../../components/Refresh/Refresh'
import NoDataTemplate from '../../../../components/NoDataTemplate/index'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'
import ExplanationTooltip from '../../../../components/ExplanationTooltip/ExplanationTooltip'
import AssetsToggleColumns from './AssetsToggleColumns'
import { COLUMNS } from './asset-columns'
import DownloadCSV from '../../Actions/DownloadCSV'
import { COMMON_SETTINGS, COLUMNS_SETTINGS } from './columns'
import { markedAsShowed } from '../../../SANCharts/SidecarExplanationTooltip'
import { EXPLANATION_TOOLTIP_MARK } from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import CompareInfo from './CompareInfo/CompareInfo'
import CompareAction from './CompareInfo/CompareAction'
import './ProjectsTable.scss'
import styles from './AssetsTable.module.scss'

const CustomNoDataComponent = ({ isLoading }) => {
  if (isLoading) {
    return null
  }

  return (
    <NoDataTemplate
      className={styles.noData}
      desc="The assets for the filter which you applying weren't found. Check if it's correct or try another filter settings."
    />
  )
}

const CustomLoadingComponent = ({ repeat, isLoading }) => {
  return (
    <div className={styles.loader}>
      <Skeleton className={styles.skeleton} show={isLoading} repeat={repeat} />
    </div>
  )
}

const AssetsTable = ({
  Assets = {
    isLoading: true,
    error: undefined,
    type: 'all'
  },
  items,
  filterType,
  showAll = false,
  preload,
  classes = {},
  refetchAssets,
  minVolume = 0,
  listName,
  type,
  settings,
  allColumns,
  setHiddenColumns,
  showCollumnsToggle = true,
  className,
  columnProps,
  compareSettings: { comparingAssets = [], addAsset } = {}
}) => {
  const [markedAsNew, setAsNewMarked] = useState()

  const hideMarkedAsNew = useCallback(() => {
    setAsNewMarked(undefined)
  }, [])

  useEffect(
    () => {
      let timer
      if (
        !markedAsShowed(EXPLANATION_TOOLTIP_MARK) &&
        items.length > 0 &&
        !markedAsNew
      ) {
        timer = setTimeout(() => {
          !markedAsNew && setAsNewMarked(items[0])
        }, 5000)
      }

      return () => clearTimeout(timer)
    },
    [items[0]]
  )

  const { isLoading, timestamp, typeInfo } = Assets
  const key = typeInfo.listId || listName
  const { sorting, pageSize, hiddenColumns } = settings[key] || {}

  const changeShowing = (columns, hiddenColumns) => {
    const modifiedColumns = JSON.parse(JSON.stringify(columns))
    hiddenColumns.forEach(name => (modifiedColumns[name].show = false))

    return modifiedColumns
  }

  const savedHidden = hiddenColumns || COMMON_SETTINGS.hiddenColumns

  const sortingColumn = sorting || COMMON_SETTINGS.sorting
  const columnsAmount = pageSize || COMMON_SETTINGS.pageSize

  const [hidden, changeHidden] = useState(savedHidden)
  const [columns, changeColumns] = useState(
    changeShowing(COLUMNS_SETTINGS, savedHidden)
  )

  if (savedHidden !== hidden) {
    changeHidden(savedHidden)
    changeColumns(changeShowing(COLUMNS_SETTINGS, savedHidden))
  }

  const toggleColumn = ({ name, show, selectable }) => {
    const toggledColumns = Object.assign({}, columns)
    // NOTE(haritonasty): such access to the fields is necessary for Safari bug (shuffle properties)
    toggledColumns[name] = {
      ...toggledColumns[name],
      show: selectable ? !show : show
    }

    if (selectable) {
      const columns = show
        ? [...savedHidden, name]
        : savedHidden.filter(item => item !== name)
      setHiddenColumns({
        listName,
        hiddenColumns: columns,
        listId: typeInfo.listId
      })
    }
    return changeColumns(toggledColumns)
  }

  const shownColumns = useMemo(
    () => {
      return COLUMNS(preload, columnProps).filter(
        ({ id }) => columns[id].show && allColumns.includes(id)
      )
    },
    [COLUMNS, preload, columnProps, allColumns, columns]
  )

  const disabledComparision = comparingAssets.length < 2

  return (
    <div className={classes.container} id='table'>
      <div className={styles.top} id='tableTop'>
        {filterType ? (
          <span>Showed based on {filterType} anomalies</span>
        ) : (
          <Refresh
            timestamp={timestamp}
            isLoading={isLoading}
            onRefreshClick={() => refetchAssets({ ...typeInfo, minVolume })}
          />
        )}
        {comparingAssets && (
          <div className={styles.leftActions}>
            <div className={styles.compareAction}>
              <CompareAction
                assets={comparingAssets}
                disabledComparision={disabledComparision}
              />
            </div>
          </div>
        )}
        <div className={styles.actions}>
          {showCollumnsToggle && (
            <AssetsToggleColumns
              columns={columns}
              onChange={toggleColumn}
              isScreener={type === 'screener'}
            />
          )}
          {type === 'screener' && (
            <>
              <ProPopupWrapper
                type='screener'
                trigger={props => (
                  <div {...props} className={styles.action__wrapper}>
                    <ExplanationTooltip text='Download .csv' offsetY={10}>
                      <Icon type='save' className={styles.action} />
                    </ExplanationTooltip>
                  </div>
                )}
              >
                <DownloadCSV
                  name={listName}
                  items={items}
                  className={styles.action}
                >
                  <ExplanationTooltip text='Download .csv' offsetY={10}>
                    <Icon type='save' />
                  </ExplanationTooltip>
                </DownloadCSV>
              </ProPopupWrapper>
            </>
          )}
        </div>
      </div>
      {comparingAssets.length > 0 && <CompareInfo selected={comparingAssets} />}
      <ReactTable
        loading={isLoading}
        showPagination={!showAll}
        showPaginationTop={false}
        showPaginationBottom
        defaultPageSize={columnsAmount}
        pageSizeOptions={[5, 10, 20, 25, 50, 100]}
        pageSize={showAll ? items && items.length : undefined}
        minRows={5}
        sortable={false}
        resizable={false}
        defaultSorted={[sortingColumn]}
        className={cx('-highlight', styles.assetsTable, className)}
        data={items}
        columns={shownColumns}
        loadingText=''
        LoadingComponent={() => (
          <CustomLoadingComponent
            isLoading={isLoading}
            repeat={columnsAmount}
          />
        )}
        NoDataComponent={() => <CustomNoDataComponent isLoading={isLoading} />}
        getTdProps={() => ({
          onClick: (e, handleOriginal) => {
            if (handleOriginal) handleOriginal()
          },
          style: { border: 'none' },
          markedasnew: markedAsNew,
          hide: hideMarkedAsNew,
          assets: comparingAssets,
          addasset: addAsset
        })}
      />
    </div>
  )
}

const mapStateToProps = ({
  projects: {
    filters: { minVolume }
  },
  watchlistUi: { watchlistsSettings }
}) => ({ minVolume, settings: watchlistsSettings })

const mapDispatchToProps = (dispatch, { refetchAssets }) => ({
  refetchAssets:
    refetchAssets ||
    (({ type, listName, listId, minVolume = 0 }) =>
      dispatch({
        type: ASSETS_FETCH,
        payload: {
          type,
          list: { name: listName, id: listId },
          filters: { minVolume }
        }
      })),
  setHiddenColumns: payload =>
    dispatch({ type: WATCHLIST_TOGGLE_COLUMNS, payload })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsTable)
