import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import PublicTemplates from './PublicTemplates/PublicTemplates'
import SocialTrends from './SocialTrends'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import IndexIndices from './IndexIndices/IndexIndices'
import IndexTab from './IndexTabs/IndexTab'
import styles from './MarketingPage.module.scss'

const MarketingPage = ({ history, userId }) => {
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
                content: <PublicTemplates />
              },
              userId && {
                type: 'Your Chart Layouts',
                content: <PublicTemplates userId={userId} />
              }
            ]}
          />
        </div>

        <div className={styles.block}>
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

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(mapStateToProps)(MarketingPage)
