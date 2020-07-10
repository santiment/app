import React from 'react'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import { BASIC_CATEGORIES } from '../../ducks/Watchlists/utils'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import MyScreeners from '../Screener/MyScreeners'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import StoriesList from '../../components/Stories/StoriesList'
import Trends from '../../components/Trends/Trends'
import styles from './index.module.scss'

const Watchlists = ({ isPublicWatchlistsLoading, history }) => {
  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <MobileOnly>
        <MobileHeader title='Explore assets' />
      </MobileOnly>
      <DesktopOnly>
        <h4 className={styles.heading}>Indices</h4>
        <WatchlistCards
          watchlists={BASIC_CATEGORIES}
          showFeatured={true}
          classes={{ watchlists: styles.section }}
        />
        <MyWatchlist
          className={styles.section}
          classes={{ emptyWatchlists: styles.emptyWatchlists }}
        />
        <MyScreeners className={styles.section} />
      </DesktopOnly>
      <MobileOnly>
        <>
          <StoriesList classes={styles} />
          <RecentlyWatched className={styles.recents} type='assets' />
          <h2 className={styles.subtitle}>Indices</h2>
          <WatchlistCards watchlists={BASIC_CATEGORIES} showFeatured={true} />
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
      </MobileOnly>
    </div>
  )
}

export default withRouter(Watchlists)
