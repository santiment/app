import React from 'react'
import cx from 'classnames'
import WatchlistCard from './WatchlistCard'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import { getWatchlistLink } from '../utils'
import Skeleton from '../../../components/Skeleton/Skeleton'
import NewWatchlistCard from './NewCard'
import { useUserScreeners } from '../gql/hooks'
import { useUser } from '../../../stores/user'
import stylesGrid from './index.module.scss'
import styles from './Watchlist.module.scss'

const MyScreeners = ({ className, showHeader = true }) => {
  const { loading: isLoggedInPending } = useUser()
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
            key={watchlist.name + watchlist.id}
            name={watchlist.name}
            watchlist={watchlist}
            to={getWatchlistLink(watchlist)}
            isPublic={watchlist.isPublic}
            {...watchlist}
          />
        ))}
        <DesktopOnly>
          <NewWatchlistCard type='screener' />
        </DesktopOnly>
      </div>
    </div>
  )
}

export default MyScreeners
