import React from 'react'
import WatchlistProjectsPage from '../WatchlistProjects'
import ScreenerPage from '../Watchlist/Screener'
import NewScreener from '../Watchlist/NewScreenerFromDefault'

const DEFAULT_SCREENER_PATH = '/screener'

const Screener = props => {
  const { location, isLoggedIn } = props
  const isDefaultScreener = location.pathname === DEFAULT_SCREENER_PATH

  if (isLoggedIn && isDefaultScreener) {
    return <NewScreener {...props} />
  }

  return (
    <WatchlistProjectsPage
      Page={ScreenerPage}
      isDefaultScreener={isDefaultScreener}
      {...props}
    />
  )
}

export default Screener
