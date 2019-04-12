import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Panel, Label, Icon } from '@santiment-network/ui'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import InsightsFeatured from '../../components/Insight/InsightsFeatured'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import FeaturedWatchlists from '../../components/Watchlists/FeaturedWatchlist'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import AnonBanner from './AnonBanner'
import styles from './DashboardPage.module.scss'

const More = ({ link }) => (
  <Link to={link} className={styles.more}>
    <Label accent='jungle-green'>
      More <Icon className={styles.pointer} type='pointer-right' />
    </Label>
  </Link>
)

const DashboardPage = ({ isLoggedIn }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? <DashboardPageOnboard /> : <AnonBanner />}
    <div className={styles.column}>
      <div className={styles.column__left}>
        <h2 className={styles.subtitle}>
          Emerging trends <More link='/labs/trends/' />
        </h2>
        <GetHypedTrends
          render={({ isLoading, items }) => (
            <TrendsTable
              header='Last trends'
              trend={items.length > 0 ? items[items.length - 1] : {}}
              isLoading={isLoading}
            />
          )}
        />
      </div>
      <div className={styles.column__right}>
        <h2 className={styles.subtitle}>
          Featured insights <More link='/insights/' />
        </h2>
        <div className={styles.insights}>
          <Panel className={styles.insights__panel}>
            <div className={styles.insights__list}>
              <InsightsFeatured className={styles.insights__card} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
    <div className={styles.section}>
      <FeaturedWatchlists />
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
