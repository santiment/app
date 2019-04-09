import React from 'react'
import AssetsOverviewCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import styles from './FeaturedWatchlist.module.scss'

const FeaturedWatchlists = () => (
  <>
    <h4>Featured Watchlists</h4>
    <div className={styles.flexRow}>
      <GetFeaturedWatchlists
        render={({ isWatchlistsLoading, watchlists }) => (
          <>
            {console.log('===========', watchlists)}
            {watchlists
              .filter(({ listItems }) => Boolean(listItems.length))
              .map(watchlist => (
                <AssetsOverviewCard
                  key={watchlist.id}
                  price={32}
                  change={1.22}
                  name={watchlist.name}
                  isPublic={watchlist.isPublic}
                  slugs={watchlist.listItems.map(({ project }) => project.slug)}
                />
              ))}
          </>
        )}
      />
    </div>
  </>
)

export default FeaturedWatchlists
