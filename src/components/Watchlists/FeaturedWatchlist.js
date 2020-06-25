import React from 'react'
import WatchlistCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'

export const getSharedWatchlistLink = watchlist =>
  getWatchlistLink(watchlist) + '#shared'

const FeaturedWatchlists = () => (
  <GetFeaturedWatchlists
    render={({ isWatchlistsLoading, watchlists }) => {
      if (isWatchlistsLoading) {
        return null
      }

      return watchlists.map(watchlist => {
        return (
          <WatchlistCard
            key={watchlist.id}
            watchlist={watchlist}
            to={getSharedWatchlistLink(watchlist)}
            slugs={watchlist.listItems.map(({ project }) => project.slug)}
            {...watchlist}
          />
        )
      })
    }}
  />
)

export default FeaturedWatchlists
