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
  orderBy,
  activeStaticColumnsKeys
} from '../../ducks/Watchlists/Widgets/Table/Columns/defaults'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import { organizeTableQuery } from '../../ducks/Watchlists/gql'
import { DIRECTIONS } from '../../ducks/Watchlists/Widgets/Table/Columns/directions'
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
  const activeDynamicColumns = useMemo(
    () => collectActiveDynamicColumns(activeDynamicColumnsKeys),
    [activeDynamicColumnsKeys]
  )
  const columns = [
    ...DEFAULT_COLUMNS,
    ...STATIC_COLUMNS,
    ...activeDynamicColumns
  ]
  const [sortingDirection, setSortingDirection] = useState(DIRECTIONS.DESC)
  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist()
  const [screenerFunction, setScreenerFunction] = useState(
    watchlist.function || DEFAULT_FUNCTION
  )
  const { assets = [], projectsCount, loading } = getProjectsByFunction(
    buildFunction({
      func: screenerFunction,
      pagination,
      orderBy: { ...orderBy, direction: sortingDirection }
    }),
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
    [sortingDirection]
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
      buildFunction({
        func: screenerFunction,
        pagination,
        orderBy: { ...orderBy, direction: sortingDirection }
      }),
      organizeTableQuery(activeDynamicColumns, activeStaticColumnsKeys),
      'network-only'
    ).then(() => setTableLoading(false))
  }

  const fetchData = useCallback(({ pageSize, pageIndex, sortBy }) => {
    const newSortingDirection = sortBy[0].desc
      ? DIRECTIONS.DESC
      : DIRECTIONS.ASC
    setSortingDirection(newSortingDirection)
    setPagination({ pageSize: +pageSize, page: +pageIndex + 1 })
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
        toggleColumn={() => {}}
      />
    </>
  )
}

export default Screener
