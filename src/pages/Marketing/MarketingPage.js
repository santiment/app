import React from 'react'
import cx from 'classnames'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import PublicTemplates from './PublicTemplates/PublicTemplates'
import SocialTrends from './SocialTrends/SocialTrends'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import IndexIndices from './IndexIndices/IndexIndices'

import styles from './MarketingPage.module.scss'

/*
<StoriesList classes={styles} showScrollBtns showShadows />

<div className={cx(styles.block, styles.insightsReports)}>
<div>
<div className={styles.subTitle}>Weekly Insights</div>
<FeaturedInsightsGrid classes={styles} withAuthorPic limit={3} />
</div>

<div className={styles.reports}>
  <div className={styles.subTitle}>Fundamental Reports</div>

  <FundamentalReports />
</div>
</div> */

const MarketingPage = ({ history }) => {
  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      <div className={styles.inner}>
        <div className={styles.block}>
          <IndexIndices />
        </div>

        <div className={styles.block}>
          <div className={styles.subTitle}>Explore Chart Layouts</div>

          <PublicTemplates />
        </div>

        <div className={styles.block}>
          <div className={styles.subTitle}>Social trends</div>
          <div className={styles.description}>
            Our previous analysis indicates that ERC-20 coins tend to be less
            correlated to Ethereum during the bull market, and exhibit higher
            correlation during the bear market. This Index charts the
            correlation of ERC-20 market cap to the ETH market cap over the last
            3 months.
          </div>
          <SocialTrends />
        </div>

        <div className={styles.block}>
          <div className={styles.subTitle}>Top Market Calls</div>
          <iframe
            title='Insights table'
            className='airtable-embed'
            src='https://airtable.com/embed/shrCwTMKbFLiRn3Eq?backgroundColor=gray&viewControls=on'
            frameBorder='0'
            width='100%'
            height='533'
            style={{
              background: 'transparent',
              border: 'none'
            }}
          />
        </div>
      </div>

      <CommonFooter />
    </div>
  )
}

export default MarketingPage
