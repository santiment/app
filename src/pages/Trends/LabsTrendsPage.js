import React from 'react'
import { Helmet } from 'react-helmet'
import cx from 'classnames'
import TrendsSearchForm from '../../components/Trends/Search'
import Suggestions from '../../components/Trends/Search/Suggestions'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import Trends from '../../components/Trends/Trends'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import styles from './LabsTrendsPage.module.scss'
import externalStyles from '../StablecoinsPage/StablecoinsPage.module.scss'

const TrendsHeader = () => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>Santrends</div>
    </div>
  )
}

const LabsTrendsPage = ({ history }) => (
  <DashboardLayout>
    <Helmet>
      <title>Today’s Top Social Gainers in Crypto - Sanbase</title>
      <meta
        property='og:title'
        content='Today’s Top Social Gainers in Crypto - Sanbase'
      />
      <meta
        property='og:description'
        content='Top 10 words with the biggest spike on crypto social media (compared to their previous 2-week average). These are the biggest developing stories in crypto.'
      />
    </Helmet>

    <div className={externalStyles.header}>
      <div className={cx(externalStyles.inner, externalStyles.content)}>
        <div className={externalStyles.pageDescription}>
          <h3 className={externalStyles.title}>
            <DesktopOnly>
              <TrendsHeader />
            </DesktopOnly>

            <MobileOnly>
              <MobileHeader
                showBack={true}
                goBack={history.goBack}
                classes={styles}
              >
                <TrendsHeader />
              </MobileHeader>
            </MobileOnly>
          </h3>
          <div className={externalStyles.description}>
            Cryptocurrencies designed to minimize the volatility of the price of
            the stablecoin, relative to some "stable" asset or basket of assets.
          </div>

          <TrendsSearchForm classes={{ wrapper: styles.search }} withButton />
          <Suggestions className={styles.suggestions} />
        </div>
      </div>
    </div>

    <div className={externalStyles.body}>
      <div className={externalStyles.inner}>
        <Trends className={styles.trends} />
      </div>
    </div>
  </DashboardLayout>
)

export default LabsTrendsPage
