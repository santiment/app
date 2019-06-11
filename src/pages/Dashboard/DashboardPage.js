import React from 'react'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import TrendsTables from '../../components/Trends/TrendsTable/TrendsTables'
import FeaturedWatchlists from '../../components/Watchlists/FeaturedWatchlist'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import InsightsScrollable from '../../components/Insight/InsightsScrollable'
import AnonBannerStaticExperiment from '../../components/Banner/AnonBanner/AnonBannerStaticExperiment'
import styles from './DashboardPage.module.scss'

const DashboardPage = ({ isLoggedIn }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? (
      <DashboardPageOnboard />
    ) : (
      <AnonBannerStaticExperiment className={styles.anonBanner} />
    )}
    <div className={styles.column}>
      <div className={styles.column__insights}>
        <div className={styles.subtitle}>
          <h2 className={styles.subtitle__text}>Latest insights</h2>
        </div>
        <InsightsScrollable
          type='latest'
          maxLines={2}
          multilineTextId='InsightsDashboardPage'
        />
      </div>
      <div className={styles.column__trends}>
        <div className={styles.subtitle}>
          <h2 className={styles.subtitle__text}>Trending words</h2>
        </div>
        <GetHypedTrends
          render={({ isLoading, items = [] }) => (
            <TrendsTables
              trends={items.slice(-1)}
              isLoading={isLoading}
              selectable={false}
            />
          )}
        />
      </div>
      <div className={styles.column__GLTable} />
    </div>
    <div className={styles.section}>
      <FeaturedWatchlists />
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
