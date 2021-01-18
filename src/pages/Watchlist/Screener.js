import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  DEFAULT_SCREENER_FUNCTION as DEFAULT_FUNCTION,
  useScreenerUrl
} from '../../ducks/Watchlists/utils'
import {
  getProjectsByFunction,
  getAssetsByFunction,
  useUpdateWatchlist
} from '../../ducks/Watchlists/gql/hooks'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import { buildFunction } from '../../ducks/Watchlists/Widgets/Filter/utils'
import Infographics from './Infographics'
import {
  activeDynamicColumnsKeys,
  activeStaticColumnsKeys,
  DEFAULT_ORDER_BY,
  DIRECTIONS
} from '../../ducks/Watchlists/Widgets/Table/Columns/defaults'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import { organizeTableQuery } from '../../ducks/Watchlists/gql'
import { collectActiveDynamicColumns } from '../../ducks/Watchlists/Widgets/Table/Columns/utils'
import {
  DEFAULT_COLUMNS,
  STATIC_COLUMNS
} from '../../ducks/Watchlists/Widgets/Table/Columns/columns'
import styles from './Screener.module.scss'

const pageSize = 20
const Screener = ({
  watchlist,
  name,
  isLoggedIn,
  isDefaultScreener,
  location,
  history,
  id,
  isLoading
}) => {
  const defaultPagination = { page: 1, pageSize: +pageSize }
  const [pagination, setPagination] = useState(defaultPagination)
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY)
  const activeDynamicColumnsObj = useMemo(
    () => collectActiveDynamicColumns(activeDynamicColumnsKeys),
    [activeDynamicColumnsKeys]
  )
  const activeDynamicColumns = useMemo(
    () => Object.values(activeDynamicColumnsObj),
    [activeDynamicColumnsObj]
  )
  const columns = [
    ...DEFAULT_COLUMNS,
    ...activeDynamicColumns,
    ...STATIC_COLUMNS
  ]
  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist()
  const [screenerFunction, setScreenerFunction] = useState(
    watchlist.function || DEFAULT_FUNCTION
  )
  const { assets = [], projectsCount, loading } = getProjectsByFunction(
    buildFunction({ func: screenerFunction, pagination, orderBy }),
    organizeTableQuery(activeDynamicColumns, activeStaticColumnsKeys)
  )
  const { user = {}, loading: userLoading } = useUser()
  const [tableLoading, setTableLoading] = useState(true)
  const { widgets, setWidgets } = useScreenerUrl({ location, history })
  const AppElem = document.getElementsByClassName('App')[0]

  if (AppElem) {
    AppElem.classList.add('list-container')
  }

  useEffect(
    () => {
      if (loading !== tableLoading) {
        setTableLoading(loading)
      }
    },
    [loading]
  )

  useEffect(
    () => {
      if (!tableLoading) {
        refetchAssets()
      }
    },
    [orderBy]
  )

  useEffect(
    () => {
      const func = watchlist.function
      if (func !== screenerFunction) {
        if (!func && screenerFunction === DEFAULT_FUNCTION) {
          return
        }

        setScreenerFunction(func)
      }
    },
    [watchlist.function]
  )

  useEffect(
    () => {
      if (pagination.page !== 1) {
        setPagination({ ...pagination, page: 1 })
      }
    },
    [screenerFunction]
  )

  useEffect(
    () => {
      if (id) {
        addRecentScreeners(id)
      }
    },
    [id]
  )

  function updateWatchlistFunction (func) {
    if (watchlist.id) {
      updateWatchlist(watchlist, { function: func })
    }
  }

  const refetchAssets = () => {
    setTableLoading(true)
    getAssetsByFunction(
      buildFunction({ func: screenerFunction, pagination, orderBy }),
      organizeTableQuery(activeDynamicColumns, activeStaticColumnsKeys),
      'network-only'
    ).then(() => setTableLoading(false))
  }

  const fetchData = useCallback(({ pageSize, sortBy }) => {
    const { id, desc } = sortBy[0]
    const { timeRange, aggregation } = activeDynamicColumnsObj[id]
    const newDirection = desc ? DIRECTIONS.DESC : DIRECTIONS.ASC
    setOrderBy({
      metric: id,
      aggregation,
      dynamicTo: 'now',
      dynamicFrom: timeRange,
      direction: newDirection
    })
    setPagination({ ...pagination, pageSize: +pageSize })
  }, [])

  const title = (watchlist || {}).name || name

  return (
    <>
      <TopPanel
        name={title}
        description={(watchlist || {}).description}
        id={id}
        assets={assets}
        projectsCount={projectsCount}
        loading={tableLoading}
        watchlist={watchlist}
        isAuthor={user && watchlist.user && watchlist.user.id === user.id}
        isAuthorLoading={userLoading || isLoading}
        isLoggedIn={isLoggedIn}
        screenerFunction={screenerFunction}
        setScreenerFunction={setScreenerFunction}
        isUpdatingWatchlist={isUpdating}
        updateWatchlistFunction={updateWatchlistFunction}
        isDefaultScreener={isDefaultScreener}
        history={history}
        widgets={widgets}
        setWidgets={setWidgets}
      />

      {!loading && (
        <Infographics
          assets={assets}
          widgets={widgets}
          setWidgets={setWidgets}
          listId={id}
          className={styles.infographics}
        />
      )}

      <AssetsTable
        items={assets}
        projectsCount={projectsCount}
        loading={tableLoading}
        type='screener'
        listName={title}
        watchlist={watchlist}
        fetchData={fetchData}
        refetchAssets={refetchAssets}
        pageSize={pagination.pageSize}
        pageIndex={pagination.page - 1}
        columns={columns}
        sorting={orderBy}
        onChangePage={pageIndex =>
          setPagination({ ...pagination, page: +pageIndex + 1 })
        }
        toggleColumn={() => {}}
      />
    </>
  )
}

export default Screener
