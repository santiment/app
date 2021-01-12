import React from 'react'
import { Redirect } from 'react-router-dom'
import WatchlistPage from '../Watchlist/Watchlist'
import AssetsMobilePage from '../Watchlists/AssetsMobilePage'
import { getIdFromSEOLink } from '../../utils/url'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import PageLoader from '../../components/Loader/PageLoader'

const WatchlistProjects = ({
  Page,
  match,
  isLoggedIn,
  isDesktop,
  ...props
}) => {
  const id = getIdFromSEOLink(match.params.nameId)
  const [watchlist, isLoading] = useWatchlist({ id })

  if (isLoading) return <PageLoader />
  if (!watchlist) return <Redirect to='/' />

  return isDesktop ? (
    <Page
      {...props}
      {...watchlist}
      watchlist={watchlist}
      isLoggedIn={isLoggedIn}
    />
  ) : (
    <AssetsMobilePage
      {...props}
      watchlist={watchlist}
      isLoggedIn={isLoggedIn}
    />
  )
}

WatchlistProjects.defaultProps = {
  Page: WatchlistPage
}

export default WatchlistProjects
