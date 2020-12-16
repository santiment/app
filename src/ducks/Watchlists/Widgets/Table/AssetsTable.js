import React, { useState, useCallback, useEffect, useMemo } from 'react'
import ReactTable from 'react-table-6'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import 'react-table-6/react-table.css'
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
import Copy from '../../Actions/Copy'
import SaveAs from '../../Actions/SaveAs'
import DownloadCSV from '../../Actions/DownloadCSV'
import { COMMON_SETTINGS, COLUMNS_SETTINGS } from './columns'
import { useUserWatchlists } from '../../gql/hooks'
import { markedAsShowed } from '../../../SANCharts/SidecarExplanationTooltip'
import { EXPLANATION_TOOLTIP_MARK } from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import CompareInfo from './CompareInfo/CompareInfo'
import CompareAction from './CompareInfo/CompareAction'
import { usePriceGraph } from '../Table/PriceGraph/hooks'
import { normalizeGraphData } from '../Table/PriceGraph/utils'
import { FILTERS_EXPLANATION_TOOLTIP_MARK } from '../Filter/Trigger'
import './ProjectsTable.scss'
import styles from './AssetsTable.module.scss'

export const CustomNoDataComponent = ({ isLoading, description, title }) => {
  if (isLoading) {
    return null
  }

  return (
    <NoDataTemplate
      className={styles.noData}
      desc={description}
      title={title}
    />
  )
}

export const CustomLoadingComponent = ({ repeat, isLoading, classes = {} }) => {
  return (
    <div className={cx(styles.loader, classes.wrapper)}>
      <Skeleton
        className={cx(styles.skeleton, classes.row)}
        show={isLoading}
        repeat={repeat}
      />
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
  watchlist,
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
  compareSettings: { comparingAssets = [], addAsset, cleanAll } = {}
}) => {
  const [markedAsNew, setAsNewMarked] = useState()
  const [visibleItems, setVisibleItems] = useState([])
  const [watchlists = []] = useUserWatchlists()
  const [graphData] = usePriceGraph({ slugs: visibleItems })
  const normalizedItems = normalizeGraphData(graphData, items)
  const hideMarkedAsNew = useCallback(() => {
    setAsNewMarked(undefined)
  }, [])

  useEffect(
    () => {
      let timer
      if (
        !markedAsShowed(EXPLANATION_TOOLTIP_MARK) &&
        markedAsShowed(FILTERS_EXPLANATION_TOOLTIP_MARK) &&
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
    <div className={styles.container} id='table'>
      <div className={styles.top} id='tableTop'>
        {filterType ? (
          <span className={styles.based}>
            Showed based on {filterType} anomalies
          </span>
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

            {comparingAssets.length > 0 && (
              <CompareInfo selected={comparingAssets} cleanAll={cleanAll} />
            )}
          </div>
        )}
        <div className={styles.actions}>
          {showCollumnsToggle && (
            <AssetsToggleColumns columns={columns} onChange={toggleColumn} />
          )}
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
            id={typeInfo.listId}
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
        data={normalizedItems}
        columns={shownColumns}
        loadingText=''
        LoadingComponent={() => (
          <CustomLoadingComponent
            isLoading={isLoading}
            repeat={columnsAmount}
          />
        )}
        NoDataComponent={() => (
          <CustomNoDataComponent
            isLoading={isLoading}
            title='No matches!'
            description="The assets for the filter which you applying weren't found. Check if it's correct or try another filter settings."
          />
        )}
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
      >
        {(state, makeTable) => {
          const startIndex = state.page * state.pageSize
          const lastIndex = startIndex + state.pageSize
          const visibleSlugs = state.resolvedData
            .slice(startIndex, lastIndex)
            .map(({ _original: { slug } }) => slug)

          if (
            visibleSlugs.length > 0 &&
            JSON.stringify(visibleSlugs) !== JSON.stringify(visibleItems)
          ) {
            setVisibleItems(visibleSlugs)
          }

          return <>{makeTable()}</>
        }}
      </ReactTable>
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
