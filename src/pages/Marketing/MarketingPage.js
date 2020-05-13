import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import PublicTemplates from './PublicTemplates/PublicTemplates'
import SocialTrends from './SocialTrends/SocialTrends'
import Trends from '../../components/Trends/Trends'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import IndexIndices from './IndexIndices/IndexIndices'
import IndexTab from './IndexTabs/IndexTab'
import styles from './MarketingPage.module.scss'
import { PATHS } from '../../App'

const isCharts = ({ search }) =>
  search.indexOf('from') !== -1 && search.indexOf('to') !== -1

const MarketingPage = props => {
  const { history, userId, location } = props

  if (isCharts(location)) {
    return <Redirect to={PATHS.STUDIO} />
  }

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
          <IndexTab
            tabs={[
              {
                type: 'Explore Chart Layouts',
                content: <PublicTemplates isFeatured />
              },
              {
                type: 'Your Chart Layouts',
                content: <PublicTemplates userId={userId} />
              }
            ]}
          />
        </div>

        <div className={styles.block}>
          <IndexTab
            tabs={[
              {
                type: 'Social Tool',
                content: (
                  <>
                    <div className={styles.description}>
                      Our previous analysis indicates that ERC-20 coins tend to
                      be less correlated to Ethereum during the bull market, and
                      exhibit higher correlation during the bear market. This
                      Index charts the correlation of ERC-20 market cap to the
                      ETH market cap over the last 3 months.
                    </div>
                    <Link to={'/labs/trends/explore/'} className={styles.link}>
                      Start researching Social Tool
                    </Link>
                    <SocialTrends />
                  </>
                )
              },
              {
                type: 'Emerging trends',
                content: <Trends />
              }
            ]}
          />
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

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(mapStateToProps)(MarketingPage)
