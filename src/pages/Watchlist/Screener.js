import React, { useState, useEffect, useCallback } from 'react'
import {
  DEFAULT_SCREENER_FUNCTION,
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
// import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
import { COLUMNS } from '../../ducks/Watchlists/Widgets/Table/new-columns'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import { organizeTableQuery } from '../../ducks/Watchlists/gql'
import { Metric } from '../../ducks/Watchlists/Widgets/Filter/dataHub/metrics'
import styles from './Screener.module.scss'

const DIRECTIONS = {
  DESC: 'desc',
  ASC: 'asc'
}

const activeDynamicColumns = [
  Metric.price_usd,
  Metric.volume_usd,
  Metric.marketcap_usd,
  Metric.dev_activity_1d,
  Metric.daily_active_addresses,
  {
    key: 'price_usd_change_1d'
  },
  {
    key: 'volume_usd_change_1d'
  }
]

const staticColumns = ['marketSegments', 'rank', 'ethSpent']

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
  const [
    updateWatchlist,
    { loading: isUpdatingWatchlist }
  ] = useUpdateWatchlist()
  const [screenerFunction, setScreenerFunction] = useState(
    watchlist.function || DEFAULT_SCREENER_FUNCTION
  )
  // const { columns, toggleColumn, pageSize } = useColumns('Screener')
  const columns = COLUMNS
  const defaultPagination = { page: 1, pageSize: +pageSize }
  // const orderBy = { metric: "dev_activity_1d", dynamicFrom: "30d", dynamicTo: "now", aggregation: "avg"}
  const orderBy = {
    metric: 'marketcap_usd',
    dynamicFrom: '1d',
    dynamicTo: 'now',
    aggregation: 'last'
  }
  const [pagination, setPagination] = useState(defaultPagination)
  const [sortingDirection, setSortingDirection] = useState(DIRECTIONS.DESC)
  const { assets = [], projectsCount, loading } = getProjectsByFunction(
    buildFunction({
      func: screenerFunction,
      pagination,
      orderBy: { ...orderBy, direction: sortingDirection }
    }),
    organizeTableQuery(activeDynamicColumns, staticColumns)
  )
  const { user = {}, loading: userLoading } = useUser()
  const [tableLoading, setTableLoading] = useState(true)

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
      if (watchlist.function !== screenerFunction) {
        if (
          !watchlist.function &&
          screenerFunction === DEFAULT_SCREENER_FUNCTION
        ) {
          return
        }

        setScreenerFunction(watchlist.function)
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
      organizeTableQuery(activeDynamicColumns, staticColumns),
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

  const { widgets, setWidgets } = useScreenerUrl({ location, history })

  const isAuthor = user && watchlist.user && watchlist.user.id === user.id
  const isAuthorLoading = userLoading || isLoading
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
        isAuthor={isAuthor}
        isAuthorLoading={isAuthorLoading}
        isLoggedIn={isLoggedIn}
        screenerFunction={screenerFunction}
        setScreenerFunction={setScreenerFunction}
        isUpdatingWatchlist={isUpdatingWatchlist}
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
