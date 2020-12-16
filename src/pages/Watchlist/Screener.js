import React, { useState, useEffect } from 'react'
import {
  DEFAULT_SCREENER_FUNCTION,
  useScreenerUrl
} from '../../ducks/Watchlists/utils'
import { getProjectsByFunction } from '../../ducks/Watchlists/gql/hooks'
import TopPanel from '../../ducks/Watchlists/Widgets/TopPanel'
import AssetsTable from '../../ducks/Watchlists/Widgets/Table'
import { ASSETS_TABLE_COLUMNS } from '../../ducks/Watchlists/Widgets/Table/columns'
import Infographics from './Infographics'
import { addRecentScreeners } from '../../utils/recent'
import { useUser } from '../../stores/user'
import styles from './Screener.module.scss'

const Screener = props => {
  const {
    watchlist,
    name,
    isLoggedIn,
    isDefaultScreener,
    location,
    history,
    id,
    isLoading
  } = props

  const [screenerFunction, setScreenerFunction] = useState(
    watchlist.function || DEFAULT_SCREENER_FUNCTION
  )
  const { assets = [], loading } = getProjectsByFunction(screenerFunction)
  const { user = {}, loading: userLoading } = useUser()

  const AppElem = document.getElementsByClassName('App')[0]
  AppElem.classList.add('list-container')

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

  // useEffect(
  //   () => {
  //     console.log(screenerFunction)
  //   }, [screenerFunction]
  // )

  const { widgets, setWidgets } = useScreenerUrl({ location, history })

  const isAuthor = user && watchlist.user.id === user.id
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
        isDefaultScreener={isDefaultScreener}
        history={history}
        widgets={widgets}
        setWidgets={setWidgets}
        wrapperElem={AppElem}
      />

      {!loading && (
        <Infographics
          assets={assets}
          widgets={widgets}
          setWidgets={setWidgets}
          listId={id}
        />
      )}

      <AssetsTable
        items={assets}
        loading={loading}
        type='screener'
        listName={title}
        watchlist={watchlist}
        // allColumns={ASSETS_TABLE_COLUMNS}
      />
    </>
  )
}

export default Screener
