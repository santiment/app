import React from 'react'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import PageLoader from '../../components/Loader/PageLoader'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import StoriesList from '../../components/Stories/StoriesList'
import styles from './WatchlistsMobilePage.module.scss'

const Watchlists = ({ isPublicWatchlistsLoading }) => {
  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <MobileHeader title='Watchlists' />
      {isPublicWatchlistsLoading ? (
        <PageLoader />
      ) : (
        <>
          <StoriesList classes={styles} />
          <RecentlyWatched className={styles.recents} type='watchlists' />
          <MyWatchlist className={styles.watchlists} />
        </>
      )}
    </div>
  )
}

export default withRouter(Watchlists)
