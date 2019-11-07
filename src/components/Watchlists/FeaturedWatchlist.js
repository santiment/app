import React from 'react'
import AssetsOverviewCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import styles from './WatchlistCards.module.scss'

export const getSharedWatchlistLink = watchlist =>
  getWatchlistLink(watchlist) + '#shared'

const FeaturedWatchlists = () => (
  <div className={styles.wrapper}>
    <GetFeaturedWatchlists
      render={({ isWatchlistsLoading, watchlists }) =>
        watchlists
          .filter(({ listItems }) => Boolean(listItems.length))
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
      }
    />
  </div>
)

export default FeaturedWatchlists
