import React from 'react'
import { Helmet } from 'react-helmet'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import TrendsSearchForm from '../../components/Trends/Search'
import Suggestions from '../../components/Trends/Search/Suggestions'
import HelpPopup from '../../components/Trends/HelpPopup/HelpPopup'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import Trends from '../../components/Trends/Trends'
import styles from './LabsTrendsPage.module.scss'

const TrendsHeader = () => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>Emerging Trends</div>
      <HelpPopup />
    </div>
  )
}

const LabsTrendsPage = ({ history }) => (
  <div className={styles.trendsWrapper + ' page'}>
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

    <div className={styles.header}>
      <DesktopOnly>
        <TrendsHeader />
      </DesktopOnly>

      <MobileOnly>
        <MobileHeader showBack={true} goBack={history.goBack} classes={styles}>
          <TrendsHeader />
        </MobileHeader>
      </MobileOnly>
    </div>

    <TrendsSearchForm classes={{ wrapper: styles.search }} withButton />
    <Suggestions className={styles.suggestions} />

    <Trends />

    <InsightsTrends className={styles.insights} />
  </div>
)

export default LabsTrendsPage
