import React from 'react'
import AssetsOverviewCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import styles from './WatchlistCards.module.scss'

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
              to={getWatchlistLink(watchlist) + '#shared'}
              slugs={watchlist.listItems.map(({ project }) => project.slug)}
            />
          ))
      }
    />
  </div>
)

export default FeaturedWatchlists
