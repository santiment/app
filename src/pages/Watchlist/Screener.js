import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
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
import { SCREENER } from '../../ducks/Watchlists/detector'
import { tableQuery } from '../../ducks/Watchlists/gql'
import { getColumns } from '../../ducks/Watchlists/Widgets/Table/Columns/builder'
import {
  DEFAULT_SCREENER_FN,
  DEFAULT_SCREENER_ID
} from '../../ducks/Screener/utils'
import styles from './Screener.module.scss'

const pageSize = 20
const EMPTY_ARRAY = []

const Screener = ({
  watchlist,
  isLoggedIn,
  isDefaultScreener,
  location,
  history,
  id
}) => {
  const defaultPagination = { page: 1, pageSize: +pageSize }
  const [pagination, setPagination] = useState(defaultPagination)
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY)
  const [activeColumnsKeys, setActiveColumnsKeys] = useState(EMPTY_ARRAY)
  const activeColumns = useMemo(() => getColumns(activeColumnsKeys), [
    activeColumnsKeys
  ])
  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist()
  const [screenerFn, setScreenerFn] = useState(
    watchlist.function || DEFAULT_SCREENER_FN
  )
  const { assets, projectsCount, loading } = getProjectsByFunction(
    ...buildFunctionQuery()
  )
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
      const fn = watchlist.function
      if (fn !== screenerFn) {
        if (!fn && screenerFn === DEFAULT_SCREENER_FN) {
          return
        }

        setScreenerFn(fn)
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
    [screenerFn]
  )

  useEffect(
    () => {
      if (id) {
        addRecentScreeners(id)
      }
    },
    [id]
  )

  function updateWatchlistFunction (fn) {
    if (watchlist.id) {
      updateWatchlist(watchlist, { function: fn })
    }
  }

  function buildFunctionQuery () {
    return [
      buildFunction({ fn: screenerFn, pagination, orderBy }),
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

  // temporal solution @haritonasty 18 Jan, 2021
  const allItems = useMemo(
    () =>
      watchlist.listItems
        ? watchlist.listItems.map(item => item.project)
        : assets,
    [watchlist]
  )

  return (
    <>
      <TopPanel
        type={SCREENER}
        watchlist={watchlist}
        projectsCount={projectsCount}
        loading={tableLoading}
        isLoggedIn={isLoggedIn}
        screenerFunction={screenerFn}
        setScreenerFunction={setScreenerFn}
        isUpdatingWatchlist={isUpdating}
        updateWatchlistFunction={updateWatchlistFunction}
        isDefaultScreener={isDefaultScreener}
        widgets={widgets}
        setWidgets={setWidgets}
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
        listName={watchlist.name}
        watchlist={watchlist}
        fetchData={fetchData}
        refetchAssets={refetchAssets}
        sorting={orderBy}
        activeColumns={activeColumns}
        setOrderBy={setOrderBy}
        updateActiveColumnsKeys={setActiveColumnsKeys}
        pageSize={pagination.pageSize}
        pageIndex={pagination.page - 1}
        onChangePage={pageIndex =>
          setPagination({ ...pagination, page: +pageIndex + 1 })
        }
      />
    </>
  )
}

export default Screener
