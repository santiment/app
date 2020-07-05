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
            name={watchlist.name}
            skipIndicator
            watchlist={watchlist}
            to={getSharedWatchlistLink(watchlist)}
            {...watchlist}
          />
        )
      })}
    </>
  ) : null
}

export default FeaturedWatchlists
