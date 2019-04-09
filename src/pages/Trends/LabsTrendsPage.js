import React from 'react'
import { Helmet } from 'react-helmet'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import Devider from '../../components/Navbar/DropdownDevider'
import TrendsSearch from '../../components/Trends/TrendsSearch'
import TrendsTables from '../../components/Trends/TrendsTable/TrendsTables'
import styles from './LabsTrendsPage.module.scss'

const LabsTrendsPage = () => (
  <div className={styles.wrapper + ' page'}>
    <Helmet>
      <title>Today’s Top Social Gainers in Crypto - SANbase</title>
      <meta
        property='og:title'
        content='Today’s Top Social Gainers in Crypto - SANbase'
      />
      <meta
        property='og:description'
        content='Top 10 words with the biggest spike on crypto social media (compared to their previous 2-week average). These are the biggest developing stories in crypto.'
      />
    </Helmet>
    <h1 className={styles.title}>Emerging Trends</h1>
    <TrendsSearch className={styles.search} />
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <TrendsTables trends={items} isLoading={isLoading} />
      )}
    />
    <Devider style={{ margin: '40px 0' }} />
    <InsightsTrends className={styles.insights} />
  </div>
)

export default LabsTrendsPage
