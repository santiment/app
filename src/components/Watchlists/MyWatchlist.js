import React from 'react'
import WatchlistCard from './WatchlistCard'
import { Button, Icon } from '@santiment-network/ui'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import Row from './../Row'
import EmptySection from '../EmptySection/EmptySection'
import NewWatchlistDialog from './NewWatchlistDialog.js'
import styles from './Watchlist.module.scss'

const WatchlistNewBtn = props => (
  <Button border className={styles.btn} {...props}>
    <Icon type='plus-round' className={styles.btn__icon} />
    New watchlist
  </Button>
)

const MyWatchlist = () => (
  <div className={styles.wrapper}>
    <DesktopOnly>
      <div className={styles.header}>
        <h4>My watchlists</h4>
        <NewWatchlistDialog trigger={<WatchlistNewBtn />} />
      </div>
    </DesktopOnly>
    <Row>
      <MobileOnly>
        <NewWatchlistDialog trigger={<WatchlistNewBtn />} />
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
