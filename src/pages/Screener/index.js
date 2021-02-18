import React from 'react'
import WatchlistProjectsPage, { WatchlistPage } from '../WatchlistProjects'
import ScreenerPage from '../Watchlist/Screener'
import NewScreener from '../Watchlist/NewScreenerFromDefault'

const DEFAULT = {}
const Screener = props => {
  const { match, isLoggedIn } = props
  const isDefaultScreener = match.params.nameId === 'new'

  if (isDefaultScreener) {
    const Page = isLoggedIn ? NewScreener : WatchlistPage
    return (
      <Page
        {...props}
        isDefaultScreener
        Page={ScreenerPage}
        watchlist={DEFAULT}
      />
    )
  }

  return <WatchlistProjectsPage Page={ScreenerPage} {...props} />
}

export default Screener
