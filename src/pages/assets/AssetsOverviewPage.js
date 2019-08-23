import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import { CATEGORIES } from './assets-overview-constants'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import PageLoader from '../../components/Loader/PageLoader'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import { checkIsLoggedIn } from './../UserSelectors'
import styles from './AssetsOverview.module.scss'

const AssetsOverview = ({
  slugs,
  isLoggedIn,
  isPublicWatchlistsLoading,
  history
}) => {
  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <DesktopOnly>
        <h1>Assets overview</h1>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Assets overview' />
      </MobileOnly>
      <DesktopOnly>
        <h4 className={styles.heading}>Categories</h4>
        <div className={styles.section}>
          <WatchlistCards watchlists={CATEGORIES} slugs={slugs} />
        </div>
        <div className={styles.section}>
          <MyWatchlist isLoggedIn={isLoggedIn} />
        </div>
      </DesktopOnly>
      <MobileOnly>
        {isPublicWatchlistsLoading ? (
          <PageLoader />
        ) : (
          <>
            <RecentlyWatched className={styles.recents} />
            <h2 className={styles.subtitle}>Categories</h2>
            <WatchlistCards watchlists={CATEGORIES} />
            <MyWatchlist
              isLoggedIn={isLoggedIn}
              className={styles.watchlists}
            />
            <h2 className={styles.subtitle}>Social gainers and losers</h2>
            <section className={styles.gainers}>
              <GainersLosersTabs
                timeWindow='2d'
                size={8}
                onProjectClick={({ coinmarketcapId }) => {
                  history.push(`/projects/${coinmarketcapId}`)
                }}
              />
            </section>
          </>
        )}
      </MobileOnly>
    </div>
  )
}

const mapStateToProps = state => ({ isLoggedIn: checkIsLoggedIn(state) })

export default withRouter(connect(mapStateToProps)(AssetsOverview))
