import React from 'react'
import { Icon, Button } from '@santiment-network/ui'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly } from './../Responsive'
import Row from './../Row'
import EmptySection from '../EmptySection/EmptySection'
import styles from './Watchlist.module.scss'

const MyWatchlist = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <div className={styles.header}>
        <h4>My watchlists</h4>
        <Button border>
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      </div>
    </DesktopOnly>
    <Row>
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
