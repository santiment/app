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
import Infographics from './Infographics'
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import styles from './Screener.module.scss'

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
  const { columns, toggleColumn, pageSize } = useColumns('Screener')
  const [pagination, setPagination] = useState({ page: 1, pageSize: +pageSize })
  const { assets = [], projectsCount, loading } = getProjectsByFunction({
    ...screenerFunction,
    args: { pagination: pagination, ...screenerFunction.args }
  })
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
      {
        ...screenerFunction,
        args: { pagination: { ...pagination }, ...screenerFunction.args }
      },
      'network-only'
    ).then(() => setTableLoading(false))
  }

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      setPagination({ pageSize: +pageSize, page: +pageIndex + 1 })
      refetchAssets()
    },
    [screenerFunction]
  )

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
        pageSize={pageSize}
        columns={columns}
        toggleColumn={toggleColumn}
      />
    </>
  )
}

export default Screener
