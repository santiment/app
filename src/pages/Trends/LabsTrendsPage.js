import React from 'react'
import { Helmet } from 'react-helmet'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import HelpPopup from '../../components/Trends/HelpPopup/HelpPopup'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import TrendsTablesWrapper from '../../components/Trends/TrendsTable/Tables/TrendsTablesWrapper'
import styles from './LabsTrendsPage.module.scss'

const TrendsHeader = () => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>Social Trends</div>
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

    <TrendsSearch
      classes={{
        wrapper: styles.search,
        form: styles.search__form,
        input: styles.search__input
      }}
    />

    <GetHypedTrends
      render={({ isLoading, items }) => (
        <>
          <TrendsTablesWrapper trends={items} isLoading={isLoading} />
        </>
      )}
    />

    <InsightsTrends className={styles.insights} />
  </div>
)

export default LabsTrendsPage
