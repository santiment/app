import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@santiment-network/ui'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import Row from './../Row'
import EmptySection from '../EmptySection/EmptySection'
import NewWatchlistDialog from './NewWatchlistDialog.js'
import WatchlistNewBtn from '../WatchlistPopup/WatchlistNewBtn'
import WatchlistsAnon from '../WatchlistPopup/WatchlistsAnon'
import WatchlistsAnonBanner from '../Banner/WatchlistsAnonBanner'
import styles from './Watchlist.module.scss'

const WatchlistEmptySection = ({ watchlists }) => (
  <EmptySection imgClassName={styles.img}>
    <span>
      <NewWatchlistDialog
        trigger={
          <Button accent='positive' className={styles.createBtn}>
            Create
          </Button>
        }
        watchlists={watchlists}
      />
      your own watchlist to track assets
    </span>
    <span>you are interested in</span>
  </EmptySection>
)

const MyWatchlist = ({ isLoggedIn }) => (
  <GetWatchlists
    render={({ isWatchlistsLoading, watchlists }) => (
      <div className={styles.wrapper}>
        <DesktopOnly>
          <div className={styles.header}>
            <h4 className={styles.heading}>My watchlists</h4>
            <NewWatchlistDialog
              trigger={<WatchlistNewBtn border disabled={!isLoggedIn} />}
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
          {isLoggedIn && !watchlists.length ? (
            <WatchlistEmptySection watchlists={watchlists} />
          ) : (
            watchlists.map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
                name={watchlist.name}
                to={getWatchlistLink(watchlist)}
                isPublic={watchlist.isPublic}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))
          )}
          {!isLoggedIn && (
            <>
              <DesktopOnly>
                <WatchlistsAnonBanner className={styles.anonBanner} />
              </DesktopOnly>
              <MobileOnly>
                <WatchlistsAnon isFullScreen={true} />
              </MobileOnly>
            </>
          )}
        </Row>
      </div>
    )}
  />
)

MyWatchlist.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default MyWatchlist
