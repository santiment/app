import React from 'react'
import WatchlistCard from './WatchlistCard'
import { useFeaturedWatchlists } from '../../ducks/Watchlists/gql/hooks'
import { getSharedWatchlistLink } from '../../ducks/Watchlists/utils'
import { sortById } from '../../utils/sortMethods'

const FeaturedWatchlists = () => {
  const [watchlists = [], loading] = useFeaturedWatchlists()
  return !loading ? (
    <>
      {watchlists.sort(sortById).map(watchlist => {
        return (
          <WatchlistCard
            key={watchlist.id}
            watchlist={watchlist}
            to={getSharedWatchlistLink(watchlist)}
            slugs={watchlist.listItems.map(({ project }) => project.slug)}
            {...watchlist}
          />
        )
      })}
    </>
  ) : null
}

export default FeaturedWatchlists
