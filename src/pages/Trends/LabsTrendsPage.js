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
  <DashboardLayout showMobileHeader={false} classes={styles}>
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

    <MobileOnly>
      <MobileHeader
        showBack={true}
        goBack={history.goBack}
        classes={styles}
        title={<TrendsHeader />}
      />
    </MobileOnly>

    <div className={externalStyles.header}>
      <div
        className={cx(
          externalStyles.inner,
          externalStyles.content,
          styles.headerContent
        )}
      >
        <div className={externalStyles.pageDescription}>
          <h3 className={externalStyles.title}>
            <DesktopOnly>
              <TrendsHeader />
            </DesktopOnly>
          </h3>
          <DesktopOnly>
            <div className={externalStyles.description}>
              Explore the social volume of any word on crypto social media
            </div>
          </DesktopOnly>

          <TrendsSearchForm classes={{ wrapper: styles.search }} withButton />
          <DesktopOnly>
            <Suggestions className={styles.suggestions} />
          </DesktopOnly>
        </div>
      </div>
    </div>

    <div className={externalStyles.body}>
      <div className={cx(externalStyles.inner, styles.inner)}>
        <Trends className={styles.trends} />
      </div>
    </div>
  </DashboardLayout>
)

export default LabsTrendsPage
