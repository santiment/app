import React, { useState, useEffect } from 'react'
import { useScreenerUrl } from '../../ducks/Watchlists/utils'
import { getProjectsByFunction, getAssetsByFunction } from '../../ducks/Watchlists/gql/hooks'
import Infographics from './Infographics'
import { SCREENER } from '../../ducks/Watchlists/detector'
import TopBar from '../../ducks/Watchlists/Widgets/TopBar/TopBar'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks'
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
import { useUpdateWatchlist } from '../../ducks/Watchlists/gql/list/mutations'
import { buildFunctionQuery } from '../../ducks/Watchlists/Widgets/Filter/utils'
import { DEFAULT_SCREENER_FN, DEFAULT_SCREENER_ID } from '../../ducks/Screener/utils'

const Screener = ({ watchlist, isLoggedIn, isDefaultScreener, location, history, id }) => {
  useRecent(watchlist, SCREENER)

  const {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys,
  } = useColumns()

  const { updatedAt } = watchlist

  const [updateWatchlist, { loading: isUpdating }] = useUpdateWatchlist(SCREENER)
  const [screenerFn, setScreenerFn] = useState(watchlist.function || DEFAULT_SCREENER_FN)
  const { assets, projectsCount, loading } = getProjectsByFunction(
    ...buildFunctionQuery({
      fn: screenerFn,
      pagination,
      orderBy,
      activeColumns,
    }),
  )

  const [tableLoading, setTableLoading] = useState(true)
  const { widgets, setWidgets } = useScreenerUrl({ location, history })

  useEffect(() => {
    if (loading !== tableLoading) {
      setTableLoading(loading)
    }
  }, [loading])

  useEffect(() => {
    if (!tableLoading) {
      refetchAssets()
    }
  }, [orderBy])

  useEffect(() => {
    const fn = watchlist.function
    if (fn !== screenerFn) {
      if (!fn && screenerFn === DEFAULT_SCREENER_FN) {
        return
      }

      setScreenerFn(fn)
    }
  }, [watchlist.function])

  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination({ ...pagination, page: 1 })
    }
  }, [screenerFn])

  useEffect(() => {
    if (watchlist.tableConfiguration) {
      const { sorting } = watchlist.tableConfiguration.columns
      sorting && setOrderBy(sorting)
    }
  }, [watchlist])

  function updateWatchlistFunction(fn) {
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
        activeColumns,
      }),
    ).then(() => setTableLoading(false))
  }

  const fetchAllColumns = () =>
    getAssetsByFunction(
      ...buildFunctionQuery({
        fn: screenerFn,
        orderBy,
        activeColumns,
      }),
    )

  return (
    <>
      <TopBar
        type={SCREENER}
        entity={watchlist}
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
        refetchAssets={refetchAssets}
      />

      <Infographics
        widgets={widgets}
        setWidgets={setWidgets}
        listId={isDefaultScreener ? DEFAULT_SCREENER_ID : id}
        assets={assets}
        updatedAt={updatedAt}
      />

      <AssetsTable
        items={assets}
        projectsCount={projectsCount}
        loading={tableLoading}
        type={SCREENER}
        watchlist={watchlist}
        fetchData={fetchData}
        refetchAssets={refetchAssets}
        fetchAllColumns={fetchAllColumns}
        sorting={orderBy}
        activeColumns={activeColumns}
        setOrderBy={setOrderBy}
        updateActiveColumnsKeys={setActiveColumnsKeys}
        pageSize={pagination.pageSize}
        pageIndex={pagination.page - 1}
        onChangePage={(pageIndex) => setPagination({ ...pagination, page: +pageIndex + 1 })}
      />
    </>
  )
}

export default Screener
