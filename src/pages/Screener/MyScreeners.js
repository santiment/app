import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { getWatchlistLink } from './../../ducks/Watchlists/utils'
import Skeleton from '../../components/Skeleton/Skeleton'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../pages/UserSelectors'
import NewWatchlistCard from '../../components/Watchlists/NewWatchlistCard'
import { useUserScreeners } from '../../ducks/Watchlists/gql/hooks'
import stylesGrid from '../../components/Watchlists/WatchlistCards.module.scss'
import styles from '../../components/Watchlists/Watchlist.module.scss'

const MyScreeners = ({
  isLoggedIn,
  isLoggedInPending,
  className,
  showHeader = true
}) => {
  const [screeners, loading] = useUserScreeners()
  return (
    <div className={cx(styles.wrapper, className)}>
      {showHeader && (
        <>
          <DesktopOnly>
            <div className={styles.header}>
              <h4 className={styles.heading}>My screeners</h4>
            </div>
          </DesktopOnly>
          <MobileOnly>
            <>
              <div className={styles.row}>
                <h2
                  className={cx(styles.subtitle, styles.subtitle__myWatchlists)}
                >
                  My screeners
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
      <div className={stylesGrid.wrapper}>
        {screeners.map(watchlist => (
          <WatchlistCard
            key={watchlist.id}
            name={watchlist.name}
            watchlist={watchlist}
            to={getWatchlistLink(watchlist)}
            isPublic={watchlist.isPublic}
            {...watchlist}
          />
        ))}
        <NewWatchlistCard type='screener' />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(MyScreeners)
