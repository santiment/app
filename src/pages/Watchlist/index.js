import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import AssetPage from '../assets/AssetsPage'
import ScreenerPage from '../Screener'
import NewScreener from './NewScreenerFromDefault'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import { getWatchlistName } from '../assets/utils'
import {
  getWatchlistId,
  isUserDynamicWatchlist,
  isDefaultScreenerPath
} from '../../ducks/Watchlists/utils'

const Watchlist = ({ isLoggedIn, ...props }) => {
  const id = getWatchlistId(props.location.search)
  const [watchlist = {}, loading, error] = useWatchlist(id)

  if (isDefaultScreenerPath(props.location.pathname) && isLoggedIn) {
    return <NewScreener {...props} />
  }

  const name = getWatchlistName(props)
  let isScreener = isUserDynamicWatchlist(watchlist) || name === 'My Screener'

  if (error) {
    console.err(error)
  }

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : isScreener ? (
        <ScreenerPage {...props} name={name} id={id} isLoggedIn={isLoggedIn} />
      ) : (
        <AssetPage {...props} isLoggedIn={isLoggedIn} />
      )}
    </>
  )
}

export default Watchlist
