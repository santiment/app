import React from 'react'
import { Redirect } from 'react-router-dom'
import LegacyWatchlistPage from '../Watchlist/Watchlist'
import AssetsMobilePage from '../Watchlists/AssetsMobilePage'
import { getIdFromSEOLink } from '../../utils/url'
import { useWatchlist } from '../../ducks/Watchlists/gql/hooks'
import PageLoader from '../../components/Loader/PageLoader'
import { mutateStoreUserActivity, InteractionType, EntityTypes } from '../../queries/userActivity'
import { useUser } from '../../stores/user'

export const WatchlistPage = ({ Page, isDesktop, ...props }) =>
  isDesktop ? (
    <Page {...props} {...props.watchlist} isDesktop={isDesktop} />
  ) : (
    <AssetsMobilePage {...props} />
  )

function storeUserViewPage(id, pathname) {
  let type
  if (pathname.startsWith('/screener/')) {
    type = EntityTypes.SCREENER
  } else if (pathname.startsWith('/watchlist/projects/')) {
    type = EntityTypes.WATCHLIST
  } else if (pathname.startsWith('/watchlist/')) {
    type = EntityTypes.ADDRESS
  }

  if (type) {
    mutateStoreUserActivity(type, id, InteractionType.VIEW)
  }
}

const WatchlistProjects = ({ match, ...props }) => {
  const id = getIdFromSEOLink(match.params.nameId)
  const [watchlist, isLoading] = useWatchlist({ id })
  const { isLoggedIn } = useUser()

  if (isLoading) return <PageLoader />
  if (!watchlist) return <Redirect to='/' />

  if (isLoggedIn && props && props.location) {
    storeUserViewPage(id, props.location.pathname)
  }

  return <WatchlistPage {...props} type='list' watchlist={watchlist} isDesktop={props.isDesktop} />
}

WatchlistProjects.defaultProps = {
  Page: LegacyWatchlistPage,
}

export default WatchlistProjects
