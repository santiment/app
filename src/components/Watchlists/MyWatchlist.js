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

const WATCHLIST_EMPTY_SECTION = (
  <EmptySection>
    Create your own wathclist to track assets
    <br />
    you are interested in
  </EmptySection>
)

const WatchlistNewBtn = props => (
  <Button className={styles.btn} {...props}>
    <Icon type='plus-round' className={styles.btn__icon} />
    New watchlist
  </Button>
)

const MyWatchlist = () => (
  <GetWatchlists
    render={({ isWatchlistsLoading, watchlists }) => (
      <div className={styles.wrapper}>
        <DesktopOnly>
          <div className={styles.header}>
            <h4>My watchlists</h4>
            <NewWatchlistDialog
              trigger={<WatchlistNewBtn border />}
              watchlists={watchlists}
            />
          </div>
        </DesktopOnly>
        <Row>
          <MobileOnly>
            <NewWatchlistDialog
              watchlists={watchlists}
              trigger={
                <WatchlistNewBtn
                  variant='fill'
                  accent='positive'
                  watchlists={watchlists}
                />
              }
            />
          </MobileOnly>
          {!watchlists.length
            ? WATCHLIST_EMPTY_SECTION
            : watchlists
              .filter(({ listItems }) => Boolean(listItems.length))
              .map(watchlist => (
                <WatchlistCard
                  key={watchlist.id}
                  name={watchlist.name}
                  to={getWatchlistLink(watchlist)}
                  isPublic={watchlist.isPublic}
                  slugs={watchlist.listItems.map(
                    ({ project }) => project.slug
                  )}
                />
              ))}
        </Row>
      </div>
    )}
  />
)

export default MyWatchlist
