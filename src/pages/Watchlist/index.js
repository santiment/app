import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import AssetPage from '../Watchlist/AssetsPage'
import ScreenerPage from './Screener'
import NewScreener from './NewScreenerFromDefault'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import {
  getWatchlistId,
  isDynamicWatchlist,
  isDefaultScreenerPath,
  getWatchlistName
} from '../../ducks/Watchlists/utils'

const Watchlist = ({ isLoggedIn, ...props }) => {
  const id = getWatchlistId(props.location.search)
  const [watchlist = {}, loading, error] = useWatchlist({ id })
  const isDefaultScreener = isDefaultScreenerPath(props.location.pathname)

  if (isDefaultScreener && isLoggedIn) {
    return <NewScreener {...props} />
  }

  if (error) {
    console.err(error)
  }

  if (loading) {
    return <PageLoader />
  }

  if (watchlist === null) {
    return <AssetPage {...props} />
  }

  const name = getWatchlistName(props)
  let isScreener = isDynamicWatchlist(watchlist) || name === 'My Screener'

  return isScreener ? (
    <ScreenerPage
      {...props}
      name={name}
      id={id}
      isDefaultScreener={isDefaultScreener}
      isLoggedIn={isLoggedIn}
      watchlist={watchlist}
    />
  ) : (
    <AssetPage {...props} isLoggedIn={isLoggedIn} />
  )
}

export default Watchlist
