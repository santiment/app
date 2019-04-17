import React from 'react'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import NewWatchlistBtn from './NewWatchlistBtn'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import Row from './../Row'
import EmptySection from '../EmptySection/EmptySection'
import styles from './Watchlist.module.scss'

const MyWatchlist = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <div className={styles.header}>
        <h4>My watchlists</h4>
        <NewWatchlistBtn />
      </div>
    </DesktopOnly>
    <Row>
      <MobileOnly>
        <NewWatchlistBtn />
      </MobileOnly>
      <GetWatchlists
        render={({ isWatchlistsLoading, watchlists }) => {
          if (!watchlists.length) {
            return (
              <EmptySection>
                Create your own wathclist to track assets
                <br />
                you are interested in
              </EmptySection>
            )
          }

          return watchlists
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
        }}
      />
    </Row>
  </div>
)

export default MyWatchlist
