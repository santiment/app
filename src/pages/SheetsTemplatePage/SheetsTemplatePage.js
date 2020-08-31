import React from 'react'
import cx from 'classnames'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import styles from './SheetsTemplatePage.module.scss'

const SheetsTemplatePage = ({ history }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      <div className={styles.chart}>
        {isPro && (
          <iframe
            title='Sheets template'
            width='1607'
            height='615'
            seamless
            frameBorder='0'
            scrolling='no'
            src='https://docs.google.com/spreadsheets/d/e/2PACX-1vSw1ohshy5iHno96J7nFYyqYVBOkOrIrRL5LFfIkZGsMR12QM-bsGFsC1CfOxqI8kkKHZdSjBcFSHsj/pubchart?oid=799877008&amp;format=interactive'
          />
        )}
        {!isPro && (
          <div className={styles.inner}>
            <MakeProSubscriptionCard classes={styles} />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <CommonFooter />
      </div>
    </div>
  )
}

export default SheetsTemplatePage
