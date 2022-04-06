import React from 'react'
import { Redirect } from 'react-router-dom'
import LegacyWatchlistPage from '../Watchlist/Watchlist'
import AssetsMobilePage from '../Watchlists/AssetsMobilePage'
import { getIdFromSEOLink } from '../../utils/url'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import PageLoader from '../../components/Loader/PageLoader'

export const WatchlistPage = ({ Page, isDesktop, ...props }) =>
  isDesktop ? (
    <Page {...props} {...props.watchlist} isDesktop={isDesktop} />
  ) : (
    <AssetsMobilePage {...props} />
  )

const WatchlistProjects = ({ match, ...props }) => {
  const id = getIdFromSEOLink(match.params.nameId)
  const [watchlist, isLoading] = useWatchlist({ id })

  if (isLoading) return <PageLoader />
  if (!watchlist) return <Redirect to='/' />
  return <WatchlistPage {...props} type='list' watchlist={watchlist} isDesktop={props.isDesktop} />
}

WatchlistProjects.defaultProps = {
  Page: LegacyWatchlistPage,
}

export default WatchlistProjects
