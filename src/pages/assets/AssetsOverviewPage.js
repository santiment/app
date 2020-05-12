import React from 'react'
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
import StoriesList from '../../components/Stories/StoriesList'
import styles from './AssetsOverview.module.scss'
import Trends from '../../components/Trends/Trends'

const AssetsOverview = ({ isPublicWatchlistsLoading, history }) => {
  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <DesktopOnly>
        <h1>Assets overview</h1>
      </DesktopOnly>
      <MobileOnly>
        <MobileHeader title='Explore assets' />
      </MobileOnly>
      <DesktopOnly>
        <h4 className={styles.heading}>Indices</h4>
        <div className={styles.section}>
          <WatchlistCards watchlists={CATEGORIES} />
        </div>
        <div className={styles.section}>
          <MyWatchlist />
        </div>
      </DesktopOnly>
      <MobileOnly>
        {isPublicWatchlistsLoading ? (
          <PageLoader />
        ) : (
          <>
            <StoriesList classes={styles} />
            <RecentlyWatched className={styles.recents} type='assets' />
            <h2 className={styles.subtitle}>Indices</h2>
            <WatchlistCards watchlists={CATEGORIES} />
            <GainersLosersTabs
              className={styles.gainers}
              timeWindow='2d'
              size={8}
              onProjectClick={({ slug }) => {
                history.push(`/projects/${slug}`)
              }}
            />
            <Trends className={styles.trends} />
          </>
        )}
      </MobileOnly>
    </div>
  )
}

export default withRouter(AssetsOverview)
