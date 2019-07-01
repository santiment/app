import React from 'react'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import TrendsTables from '../../components/Trends/TrendsTable/TrendsTables'
import FeaturedWatchlists from '../../components/Watchlists/FeaturedWatchlist'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import FeaturedInsightsGrid from '../../components/FeaturedInsights/FeaturedInsightsGrid'
import InsightsScrollable from '../../components/Insight/InsightsScrollable'
import AnonBannerStaticExperiment from '../../components/Banner/AnonBanner/AnonBannerStaticExperiment'
import styles from './DashboardPage.module.scss'

const DashboardPage = ({ isLoggedIn, hasMetamask }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? (
      <DashboardPageOnboard hasMetamask={hasMetamask} />
    ) : (
      <AnonBannerStaticExperiment className={styles.anonBanner} />
    )}
    <div className={styles.column}>
      <div className={styles.column__left}>
        <h2 className={styles.subtitle}>Trending words</h2>
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
      <div className={styles.column__right}>
        <h2 className={styles.subtitle}>Latest insights</h2>
        <InsightsScrollable
          type='latest'
          maxLines={2}
          multilineTextId='InsightsDashboardPage'
        />
      </div>
    </div>
    <div className={styles.section}>
      <h2 className={styles.subtitle}>Featured insights</h2>
      <FeaturedInsightsGrid />
    </div>
    <div className={styles.section}>
      <h2 className={styles.subtitle}>Featured watchlists</h2>
      <FeaturedWatchlists />
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
