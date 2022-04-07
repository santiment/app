import React from 'react'
import WatchlistProjectsPage, { WatchlistPage } from '../WatchlistProjects'
import ScreenerPage from '../Watchlist/Screener'
import NewScreener from '../Watchlist/NewScreenerFromDefault'
import { checkIsDefaultScreener } from '../../ducks/Screener/utils'

const DEFAULT = {}
const Screener = (props) => {
  const { isLoggedIn, isUserLoading } = props
  const isDefaultScreener = checkIsDefaultScreener(props.location.pathname)
  if (isDefaultScreener) {
    const Page = isLoggedIn && !isUserLoading ? NewScreener : WatchlistPage
    return <Page {...props} isDefaultScreener Page={ScreenerPage} watchlist={DEFAULT} />
  }

  return <WatchlistProjectsPage Page={ScreenerPage} {...props} />
}

export default Screener
