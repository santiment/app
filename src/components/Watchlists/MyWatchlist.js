import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
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
}) => {
  const [watchlists, loading] = useUserWatchlists(isLoggedIn)
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
      {!loading && !isLoggedInPending && !isLoggedIn && (
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
  )
}

MyWatchlist.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedInPending: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(MyWatchlist)
