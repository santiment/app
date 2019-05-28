import React from 'react'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import Row from './../Row'
import EmptySection from '../EmptySection/EmptySection'
import NewWatchlistDialog from './NewWatchlistDialog.js'
import WatchlistNewBtn from '../WatchlistPopup/WatchlistNewBtn'
import WatchlistsAnon from '../WatchlistPopup/WatchlistsAnon'
import styles from './Watchlist.module.scss'

const WATCHLIST_EMPTY_SECTION = (
  <EmptySection>
    Create your own wathclist to track assets
    <br />
    you are interested in
  </EmptySection>
)

const MyWatchlist = ({ isLoggedIn }) => (
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
            {isLoggedIn && (
              <NewWatchlistDialog
                watchlists={watchlists}
                trigger={<WatchlistNewBtn variant='fill' accent='positive' />}
              />
            )}
          </MobileOnly>
          {isLoggedIn && !watchlists.length
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
          {!isLoggedIn && <WatchlistsAnon />}
        </Row>
      </div>
    )}
  />
)

export default MyWatchlist
