import React from 'react'
import AssetsOverviewCard from './WatchlistCard'
import GetFeaturedWatchlists from './../../ducks/Watchlists/GetFeaturedWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly } from './../../components/Responsive'
import Row from './../../components/Row'
import styles from './Watchlist.module.scss'

const FeaturedWatchlists = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <h4>Featured Watchlists</h4>
    </DesktopOnly>
    <Row>
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
                to={getWatchlistLink(watchlist)}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))
        }
      />
    </Row>
  </div>
)

export default FeaturedWatchlists
