import React from 'react'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import TrendsTables from '../../components/Trends/TrendsTable/Tables/TrendsTablesDesktop'
import HelpPopup from '../../components/Trends/HelpPopup/HelpPopup'
import FeaturedWatchlists from '../../components/Watchlists/FeaturedWatchlist'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import FeaturedInsightsGrid from '../../components/FeaturedInsights/FeaturedInsightsGrid'
import InsightsScrollable from '../../components/Insight/InsightsScrollable'
import GainersLosersTabs from '../../components/GainersAndLosers/GainersLosersTabs'
import AnonBannerStaticExperiment from '../../components/Banner/AnonBanner/AnonBannerStaticExperiment'
import styles from './DashboardPage.module.scss'

const DashboardPage = ({ isLoggedIn, hasMetamask, history }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? (
      <DashboardPageOnboard hasMetamask={hasMetamask} />
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
          <HelpPopup />
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
      <div className={styles.column__GLTable}>
        <div className={styles.subtitle}>
          <h2 className={styles.subtitle__text}>By Social Data</h2>
        </div>
        <GainersLosersTabs
          timeWindow='2d'
          size={8}
          onProjectClick={({ slug }) => {
            history.push(`/projects/${slug}`)
          }}
        />
      </div>
    </div>
    <div className={styles.section}>
      <div className={styles.subtitle}>
        <h2 className={styles.subtitle__text}>Featured insights</h2>
      </div>
      <FeaturedInsightsGrid />
    </div>
    <div className={styles.section}>
      <div className={styles.subtitle}>
        <h2 className={styles.subtitle__text}>Featured watchlists</h2>
      </div>
      <FeaturedWatchlists />
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
