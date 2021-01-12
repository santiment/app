import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import WatchlistCard from './WatchlistCard'
import { getWatchlistLink } from '../utils'
import { DesktopOnly, MobileOnly } from './../../../components/Responsive'
import EmptySection from '../../../components/EmptySection/EmptySection'
import Skeleton from '../../../components/Skeleton/Skeleton'
import NewWatchlist from '../Actions/New'
import WatchlistsAnon from '../Templates/Anon/WatchlistsAnon'
import InlineBanner from '../../../components/banners/feature/InlineBanner'
import NewWatchlistCard from './NewCard'
import { useUserWatchlists } from '../gql/hooks'
import { useUser } from '../../../stores/user'
import stylesGrid from './index.module.scss'
import styles from './Watchlist.module.scss'

const WatchlistEmptySection = ({ watchlists, className }) => (
  <EmptySection
    className={styles.empty__row}
    imgClassName={cx(styles.img, className)}
  >
    <div className={styles.empty__text}>
      <span>Create your own watchlist to track assets</span>
      <span>you are interested in</span>

      <NewWatchlist
        trigger={
          <Button variant='fill' accent='positive' className={styles.emptyBtn}>
            Create watchlist
          </Button>
        }
        lists={watchlists}
        type='watchlist'
      />
    </div>
  </EmptySection>
)

const MyWatchlist = ({ className, showHeader = true, classes = {} }) => {
  const [watchlists, loading] = useUserWatchlists()
  const { isLoggedIn, loading: isLoggedInPending } = useUser()
  console.log(watchlists)

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
            <InlineBanner
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

export default MyWatchlist
