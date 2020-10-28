import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import ResearchesBlock from '../../components/ResearchesBlock'
import CommonFooter from '../../pages/ProMetrics/ProMetricsFooter/CommonFooter'
import styles from './DashboardLayout.module.scss'

const DashboardLayout = ({ history, children }) => {
  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      {children}

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default withRouter(DashboardLayout)
