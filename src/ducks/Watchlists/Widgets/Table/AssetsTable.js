import React, { useState, useCallback, useEffect } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import 'react-table/react-table.css'
import {
  ASSETS_FETCH,
  WATCHLIST_TOGGLE_COLUMNS
} from '../../../../actions/types'
import Refresh from '../../../../components/Refresh/Refresh'
import ServerErrorMessage from './../../../../components/ServerErrorMessage'
import { ProLabel } from '../../../../components/ProLabel'
import NoDataTemplate from '../../../../components/NoDataTemplate/index'
import AssetsToggleColumns from './AssetsToggleColumns'
import Filter from '../Filter'
import SaveAs from '../../Actions/SaveAs'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import { COLUMNS } from './asset-columns'
import { COMMON_SETTINGS, COLUMNS_SETTINGS } from './columns'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import { markedAsShowed } from '../../../SANCharts/SidecarExplanationTooltip'
import { EXPLANATION_TOOLTIP_MARK } from '../../../Studio/Template/LayoutForAsset/LayoutForAsset'
import './ProjectsTable.scss'
import styles from './AssetsTable.module.scss'

export const CustomHeadComponent = ({ children, className, ...rest }) => (
  <Sticky enabled innerZ={1}>
    <div className={cx('rt-thead', className)} {...rest}>
      {children}
    </div>
  </Sticky>
)

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
  watchlist,
  projectsCount,
  settings,
  allColumns,
  isAuthor,
  setHiddenColumns,
  showCollumnsToggle = true,
  className,
  columnProps,
  screenerFunction,
  ...props
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const [markedAsNew, setAsNewMarked] = useState()
  const [isFilterOpened, setIsFilterOpened] = useState(false)

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
          console.log('set new', 'previous', markedAsNew)
          !markedAsNew && setAsNewMarked(items[0])
        }, 5000)
      }

      return () => clearTimeout(timer)
    },
    [items[0]]
  )

  const { isLoading, error, timestamp, typeInfo } = Assets
  const key = typeInfo.listId || listName
  const { sorting, pageSize, hiddenColumns } = settings[key] || {}
  if (error && error.message !== 'Network error: Failed to fetch') {
    return <ServerErrorMessage />
  }

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

  const shownColumns = COLUMNS(preload, columnProps).filter(
    ({ id }) => columns[id].show && allColumns.includes(id)
  )

  return (
    <div className={classes.container} id='table'>
      <div
        className={cx(styles.top, isFilterOpened && styles.top__filterView)}
        id='tableTop'
      >
        {filterType ? (
          <span>Showed based on {filterType} anomalies</span>
        ) : (
          <Refresh
            timestamp={timestamp}
            isLoading={isLoading}
            onRefreshClick={() => refetchAssets({ ...typeInfo, minVolume })}
          />
        )}
        {type === 'screener' && screenerFunction.name !== 'top_all_projects' && (
          <div className={styles.saveAs}>
            <SaveAs
              watchlist={watchlist}
              trigger={
                <Button disabled={!isPro} border className={styles.saveAs__btn}>
                  <Icon type='disk' className={styles.saveAs__icon} />
                  Save as
                </Button>
              }
            />
            {!isPro && <ProLabel className={styles.saveAs__proLabel} />}
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
              <ScreenerSignalDialog
                watchlistId={watchlist.id}
                classes={styles}
              />
              <Filter
                watchlist={watchlist}
                // projectsCount={projectsCount}
                projectsCount={items.length}
                isAuthor={isAuthor}
                isOpen={isFilterOpened}
                setIsOpen={setIsFilterOpened}
                screenerFunction={screenerFunction}
                {...props}
              />
            </>
          )}
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
        className={cx(
          '-highlight',
          styles.assetsTable,
          isFilterOpened && styles.assetsTable__filterView,
          className
        )}
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
        TheadComponent={CustomHeadComponent}
        getTdProps={() => ({
          onClick: (e, handleOriginal) => {
            if (handleOriginal) handleOriginal()
          },
          style: { border: 'none' },
          markedasnew: markedAsNew,
          hide: hideMarkedAsNew
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
