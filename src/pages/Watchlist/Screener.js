import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  DEFAULT_SCREENER_FUNCTION as DEFAULT_FUNC,
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
  DEFAULT_ORDER_BY,
  DIRECTIONS
} from '../../ducks/Watchlists/Widgets/Table/Columns/defaults'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import { tableQuery } from '../../ducks/Watchlists/gql'
import { DEFAULT_SCREENER_ID } from '../../ducks/Watchlists/gql/queries'
import { getColumns } from '../../ducks/Watchlists/Widgets/Table/Columns/builder'
import styles from './Screener.module.scss'

const pageSize = 20
const EMPTY_ARRAY = []

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
  const [activeColumnsKeys, setActiveColumnsKeys] = useState(EMPTY_ARRAY)
  const activeColumns = useMemo(() => getColumns(activeColumnsKeys), [
    activeColumnsKeys
  ])
  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist()
  const [screenerFunc, setScreenerFunc] = useState(
    watchlist.function || DEFAULT_FUNC
  )
  const { assets, projectsCount, loading } = getProjectsByFunction(
    ...buildFunctionQuery()
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
      if (func !== screenerFunc) {
        if (!func && screenerFunc === DEFAULT_FUNC) {
          return
        }

        setScreenerFunc(func)
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
    [screenerFunc]
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

  function buildFunctionQuery () {
    return [
      buildFunction({ func: screenerFunc, pagination, orderBy }),
      tableQuery(activeColumns)
    ]
  }

  const refetchAssets = () => {
    setTableLoading(true)
    getAssetsByFunction(...buildFunctionQuery()).then(() =>
      setTableLoading(false)
    )
  }

  const fetchData = useCallback(
    ({ pageSize, sortBy }) => {
      const { id, desc } = sortBy[0]
      const activeColumn = activeColumns.find(column => column.key === id)
      if (!activeColumn) {
        setOrderBy(DEFAULT_ORDER_BY)
      } else {
        const { timeRange, aggregation } = activeColumn
        const newDirection = desc ? DIRECTIONS.DESC : DIRECTIONS.ASC
        setOrderBy({
          metric: id,
          aggregation,
          dynamicTo: 'now',
          dynamicFrom: timeRange,
          direction: newDirection
        })
      }
      setPagination({ ...pagination, pageSize: +pageSize })
    },
    [activeColumns]
  )

  const title = watchlist.name || name || 'My screener'
  // temporal solution @haritonasty 18 Jan, 2021
  const allItems = useMemo(
    () => {
      return watchlist.listItems
        ? watchlist.listItems.map(item => item.project)
        : assets
    },
    [watchlist]
  )

  const isAuthor = user && watchlist.user && watchlist.user.id === user.id

  return (
    <>
      <TopPanel
        name={title}
        description={(watchlist || {}).description}
        id={id}
        projectsCount={projectsCount}
        loading={tableLoading}
        watchlist={watchlist}
        isAuthor={isAuthor}
        isAuthorLoading={userLoading || isLoading}
        isLoggedIn={isLoggedIn}
        screenerFunction={screenerFunc}
        setScreenerFunction={setScreenerFunc}
        isUpdatingWatchlist={isUpdating}
        updateWatchlistFunction={updateWatchlistFunction}
        isDefaultScreener={isDefaultScreener}
        widgets={widgets}
        setWidgets={setWidgets}
        type='screener'
      />

      {!loading && (
        <Infographics
          assets={allItems}
          widgets={widgets}
          setWidgets={setWidgets}
          listId={isDefaultScreener ? DEFAULT_SCREENER_ID : id}
          className={styles.infographics}
        />
      )}

      <AssetsTable
        items={assets}
        allItems={allItems}
        projectsCount={projectsCount}
        loading={tableLoading}
        type='screener'
        listName={title}
        watchlist={watchlist}
        fetchData={fetchData}
        refetchAssets={refetchAssets}
        pageSize={pagination.pageSize}
        pageIndex={pagination.page - 1}
        sorting={orderBy}
        activeColumns={activeColumns}
        updateActiveColumnsKeys={setActiveColumnsKeys}
        isAuthor={isAuthor}
        onChangePage={pageIndex =>
          setPagination({ ...pagination, page: +pageIndex + 1 })
        }
      />
    </>
  )
}

export default Screener
