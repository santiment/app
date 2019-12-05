import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import PageLoader from '../../components/Loader/PageLoader'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import { checkIsLoggedIn } from './../UserSelectors'
import styles from './WatchlistsMobilePage.module.scss'
import StoriesList from '../../components/Stories/StoriesList'

const Watchlists = ({
  slugs,
  isLoggedIn,
  isPublicWatchlistsLoading,
  history
}) => {
  return (
    <div className={cx(styles.overviewPage, 'page')}>
      <MobileHeader title='Watchlists' />
      {isPublicWatchlistsLoading ? (
        <PageLoader />
      ) : (
        <>
          <StoriesList classes={styles} />
          <RecentlyWatched className={styles.recents} type='watchlists' />
          <MyWatchlist isLoggedIn={isLoggedIn} className={styles.watchlists} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({ isLoggedIn: checkIsLoggedIn(state) })

export default withRouter(connect(mapStateToProps)(Watchlists))
