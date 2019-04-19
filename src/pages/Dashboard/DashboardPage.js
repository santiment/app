import React from 'react'
import { Link } from 'react-router-dom'
import { Label } from '@santiment-network/ui'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import TrendsTables from '../../components/Trends/TrendsTable/TrendsTables'
import FeaturedWatchlists from '../../components/Watchlists/FeaturedWatchlist'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import FeaturedInsightsScrollable from '../../components/FeaturedInsights/FeaturedInsightsScrollable'
import AnonBannerStatic from '../../components/Banner/AnonBannerStatic'
import styles from './DashboardPage.module.scss'

const More = ({ link }) => (
  <Link to={link} className={styles.more}>
    <Label accent='jungle-green'>More</Label>
  </Link>
)

const DashboardPage = ({ isLoggedIn }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? <DashboardPageOnboard /> : <AnonBannerStatic />}
    <div className={styles.column}>
      <div className={styles.column__left}>
        <div className={styles.subtitle}>
          <h2 className={styles.subtitle__text}>Emerging trends</h2>
          <More link='/labs/trends/' />
        </div>
        <GetHypedTrends
          render={({ isLoading, items }) => (
            <TrendsTables
              trends={items.slice(-1)}
              isLoading={isLoading}
              selectable={false}
            />
          )}
        />
      </div>
      <div className={styles.column__right}>
        <div className={styles.subtitle}>
          <h2 className={styles.subtitle__text}>Featured insights</h2>
          <More link='/insights/' />
        </div>
        <FeaturedInsightsScrollable
          maxLines={2}
          multilineTextId='InsightsDashboardPage'
        />
      </div>
    </div>
    <div className={styles.section}>
      <FeaturedWatchlists />
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
