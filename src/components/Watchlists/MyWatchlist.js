import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import WatchlistCard from './WatchlistCard'
import { getWatchlistLink } from './../../ducks/Watchlists/utils'
import { DesktopOnly, MobileOnly } from './../Responsive'
import EmptySection from '../EmptySection/EmptySection'
import Skeleton from '../Skeleton/Skeleton'
import NewWatchlistDialog from './NewWatchlistDialog'
import WatchlistsAnon from '../WatchlistPopup/WatchlistsAnon'
import FeatureAnonBanner from '../Banner/FeatureAnonBanner'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../pages/UserSelectors'
import NewWatchlistCard from './NewWatchlistCard'
import { useUserWatchlists } from '../../ducks/Watchlists/gql/hooks'
import stylesGrid from './WatchlistCards.module.scss'
import styles from './Watchlist.module.scss'

const WatchlistEmptySection = ({ watchlists, className }) => (
  <EmptySection
    className={styles.empty__row}
    imgClassName={cx(styles.img, className)}
  >
    <div className={styles.empty__text}>
      <span>Create your own watchlist to track assets</span>
      <span>you are interested in</span>

      <NewWatchlistDialog
        trigger={
          <Button variant='fill' accent='positive' className={styles.emptyBtn}>
            Create watchlist
          </Button>
        }
        watchlists={watchlists}
      />
    </div>
  </EmptySection>
)

const MyWatchlist = ({
  isLoggedIn,
  isLoggedInPending,
  className,
  showHeader = true,
  classes = {}
}) => {
  const [watchlists, loading] = useUserWatchlists()
  return (
    <div className={cx(styles.wrapper, className)}>
      {showHeader && (
        <>
          <DesktopOnly>
            <div className={styles.header}>
              <h4 className={styles.heading}>My watchlists</h4>
            </div>
          </DesktopOnly>
          <MobileOnly>
            <>
              <div className={styles.row}>
                <h2
                  className={cx(styles.subtitle, styles.subtitle__myWatchlists)}
                >
                  My watchlists
                </h2>
              </div>
              <Skeleton
                repeat={4}
                className={styles.skeleton}
                show={loading || isLoggedInPending}
              />
            </>
          </MobileOnly>
        </>
      )}
      {isLoggedIn && !loading && !watchlists.length && (
        <div className={styles.emptyWrapper}>
          <WatchlistEmptySection
            watchlists={watchlists}
            className={classes.emptyWatchlists}
          />
        </div>
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
              {...watchlist}
            />
          ))}
          {watchlists.length > 0 && <NewWatchlistCard />}
        </div>
      )}
      {!loading && !isLoggedInPending && !isLoggedIn && (
        <>
          <DesktopOnly>
            <FeatureAnonBanner
              title='Get ability to create your own watchlist when you login'
              description="Track selected assets in one place and check it's status"
            />
          </DesktopOnly>
          <MobileOnly>
            <WatchlistsAnon isFullScreen={true} />
          </MobileOnly>
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(MyWatchlist)
