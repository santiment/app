import React from 'react'
import AssetsOverviewCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'

export const getSharedWatchlistLink = watchlist =>
  getWatchlistLink(watchlist) + '#shared'

const FeaturedWatchlists = ({ additional = [] }) => (
  <GetFeaturedWatchlists
    render={({ isWatchlistsLoading, watchlists }) => {
      if (isWatchlistsLoading) {
        return null
      }

      return watchlists
        .filter(({ listItems }) => !listItems.length)
        .map(watchlist => (
          <AssetsOverviewCard
            key={watchlist.id}
            price={32}
            change={1.22}
            name={watchlist.name}
            isPublic={watchlist.isPublic}
            to={getSharedWatchlistLink(watchlist)}
            slugs={watchlist.listItems.map(({ project }) => project.slug)}
          />
        ))
    }}
  />
)

export default FeaturedWatchlists
