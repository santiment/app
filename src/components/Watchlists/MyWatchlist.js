import React from 'react'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly } from './../../components/Responsive'
import styles from './FeaturedWatchlist.module.scss'

const MyWatchlist = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <h4>My watchlists</h4>
    </DesktopOnly>
    <div className={styles.row}>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists }) =>
          watchlists
            .filter(({ listItems }) => Boolean(listItems.length))
            .map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
                name={watchlist.name}
                to={getWatchlistLink(watchlist)}
                isPublic={watchlist.isPublic}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))
        }
      />
    </div>
  </div>
)

export default MyWatchlist
