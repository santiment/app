import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import PageLoader from '../../components/Loader/PageLoader'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import { checkIsLoggedIn, checkIsLoggedInPending } from './../UserSelectors'
import StoriesList from '../../components/Stories/StoriesList'
import styles from './WatchlistsMobilePage.module.scss'

const Watchlists = ({
  slugs,
  isLoggedIn,
  isLoggedInPending,
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
          <MyWatchlist
            isLoggedIn={isLoggedIn}
            isLoggedInPending={isLoggedInPending}
            className={styles.watchlists}
          />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default withRouter(connect(mapStateToProps)(Watchlists))
