import React, { useState, useEffect } from 'react'
import {
  DEFAULT_SCREENER_FUNCTION,
  useScreenerUrl
} from '../../ducks/Watchlists/utils'
import {
  getProjectsByFunction,
  useUpdateWatchlist
} from '../../ducks/Watchlists/gql/hooks'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import Infographics from './Infographics'
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
  const [flag, setFlag] = useState(true)
  const { assets = [], loading, timestamp } = getProjectsByFunction(
    screenerFunction,
    flag
  )
  const { user = {}, loading: userLoading } = useUser()

  const AppElem = document.getElementsByClassName('App')[0]

  if (AppElem) {
    AppElem.classList.add('list-container')
  }

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

  function updateWatchlistFunction (func) {
    if (watchlist.id) {
      updateWatchlist(watchlist, { function: func })
    }
  }

  const { widgets, setWidgets } = useScreenerUrl({ location, history })

  const isAuthor = user && watchlist.user && watchlist.user.id === user.id
  const isAuthorLoading = userLoading || isLoading
  const title = (watchlist || {}).name || name

  if (id) {
    addRecentScreeners(id)
  }

  return (
    <>
      <TopPanel
        name={title}
        description={(watchlist || {}).description}
        id={id}
        assets={assets}
        loading={loading}
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
        loading={loading}
        type='screener'
        listName={title}
        watchlist={watchlist}
        timestamp={timestamp}
        refetchAssets={() => setFlag(!flag)}
      />
    </>
  )
}

export default Screener
