import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import WatchlistCard from './WatchlistCard'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { getWatchlistLink } from './../../ducks/Watchlists/watchlistUtils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import EmptySection from '../EmptySection/EmptySection'
import Skeleton from '../Skeleton/Skeleton'
import NewWatchlistDialog from './NewWatchlistDialog'
import WatchlistNewBtn from '../WatchlistPopup/WatchlistNewBtn'
import WatchlistsAnon from '../WatchlistPopup/WatchlistsAnon'
import FeatureAnonBanner from '../Banner/FeatureAnonBanner'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../pages/UserSelectors'
import styles from './Watchlist.module.scss'
import stylesGrid from './WatchlistCards.module.scss'
import NewWatchlistCard from './NewWatchlistCard'

const WatchlistEmptySection = ({ watchlists, className }) => (
  <EmptySection imgClassName={cx(styles.img, className)}>
    <span>Create your own watchlist to track assets</span>
    <span>you are interested in</span>

    <NewWatchlistDialog
      trigger={
        <Button variant='fill' accent='positive' className={styles.btn}>
          Create watchlist
        </Button>
      }
      watchlists={watchlists}
    />
  </EmptySection>
)

const MyWatchlist = ({
  isLoggedIn,
  isLoggedInPending,
  className,
  showHeader = true,
  showNew = false,
  classes = {}
}) => (
  <GetWatchlists
    render={({ isWatchlistsLoading, watchlists }) => (
      <div className={cx(styles.wrapper, className)}>
        {showHeader && (
          <>
            <DesktopOnly>
              <div className={styles.header}>
                <h4 className={styles.heading}>My watchlists</h4>
                <NewWatchlistDialog
                  trigger={<WatchlistNewBtn border disabled={!isLoggedIn} />}
                  watchlists={watchlists}
                />
              </div>
            </DesktopOnly>
            <MobileOnly>
              <>
                <div className={styles.row}>
                  <h2
                    className={cx(
                      styles.subtitle,
                      styles.subtitle__myWatchlists
                    )}
                  >
                    My watchlists
                  </h2>
                  {isLoggedIn && watchlists.length > 0 && (
                    <NewWatchlistDialog
                      watchlists={watchlists}
                      trigger={
                        <WatchlistNewBtn
                          accent='positive'
                          className={styles.newBtn}
                        />
                      }
                    />
                  )}
                </div>
                <Skeleton
                  repeat={4}
                  className={styles.skeleton}
                  show={isWatchlistsLoading || isLoggedInPending}
                />
              </>
            </MobileOnly>
          </>
        )}
        {isLoggedIn && !isWatchlistsLoading && !watchlists.length && (
          <>
            <DesktopOnly>
              <WatchlistEmptySection
                watchlists={watchlists}
                className={classes.emptyWatchlists}
              />
            </DesktopOnly>
            <MobileOnly>
              <Panel className={styles.emptyWrapper}>
                <WatchlistEmptySection
                  watchlists={watchlists}
                  className={classes.emptyWatchlists}
                />
              </Panel>
            </MobileOnly>
          </>
        )}
        {isLoggedIn && (
          <div className={stylesGrid.wrapper}>
            {watchlists.map(watchlist => (
              <WatchlistCard
                key={watchlist.id}
                name={watchlist.name}
                watchlist={watchlist}
                to={getWatchlistLink(watchlist)}
                isPublic={watchlist.isPublic}
                slugs={watchlist.listItems.map(({ project }) => project.slug)}
              />
            ))}
            {showNew && watchlists.length > 0 && <NewWatchlistCard />}
          </div>
        )}
        {!isWatchlistsLoading && !isLoggedInPending && !isLoggedIn && (
          <>
            <DesktopOnly>
              <FeatureAnonBanner className={styles.anonBanner} />
            </DesktopOnly>
            <MobileOnly>
              <WatchlistsAnon isFullScreen={true} />
            </MobileOnly>
          </>
        )}
      </div>
    )}
  />
)

MyWatchlist.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedInPending: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(MyWatchlist)
