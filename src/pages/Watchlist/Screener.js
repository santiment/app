import React, { useState, useEffect } from 'react'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
import {
  getProjectsByFunction,
  getAssetsByFunction
} from '../../ducks/Watchlists/gql/hooks'
import Infographics from './Infographics'
import { SCREENER } from '../../ducks/Watchlists/detector'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks'
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
import { useUpdateWatchlist } from '../../ducks/Watchlists/gql/list/mutations'
import { buildFunctionQuery } from '../../ducks/Watchlists/Widgets/Filter/utils'
import {
  DEFAULT_SCREENER_FN,
  DEFAULT_SCREENER_ID
} from '../../ducks/Screener/utils'
import styles from './Screener.module.scss'

const Screener = ({
  watchlist,
  isLoggedIn,
  isDefaultScreener,
  location,
  history,
  id
}) => {
  useRecent(watchlist, SCREENER)

  const {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys
  } = useColumns()

  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist(
    SCREENER
  )
  const [screenerFn, setScreenerFn] = useState(
    watchlist.function || DEFAULT_SCREENER_FN
  )
  const { assets, projectsCount, loading } = getProjectsByFunction(
    ...buildFunctionQuery({
      fn: screenerFn,
      pagination,
      orderBy,
      activeColumns
    })
  )
  const [tableLoading, setTableLoading] = useState(true)
  const { widgets, setWidgets } = useScreenerUrl({ location, history })

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

  function updateWatchlistFunction (fn) {
    if (watchlist.id) {
      updateWatchlist(watchlist, { function: fn })
    }
  }

  const refetchAssets = () => {
    setTableLoading(true)
    getAssetsByFunction(
      ...buildFunctionQuery({
        fn: screenerFn,
        pagination,
        orderBy,
        activeColumns
      })
    ).then(() => setTableLoading(false))
  }

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
          widgets={widgets}
          setWidgets={setWidgets}
          listId={isDefaultScreener ? DEFAULT_SCREENER_ID : id}
          className={styles.infographics}
        />
      )}

      <AssetsTable
        items={assets}
        projectsCount={projectsCount}
        loading={tableLoading}
        type={SCREENER}
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
