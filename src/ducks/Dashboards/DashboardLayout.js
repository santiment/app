import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import ResearchesBlock from '../../components/ResearchesBlock'
import CommonFooter from '../../pages/ProMetrics/ProMetricsFooter/CommonFooter'
import styles from './DashboardLayout.module.scss'

const DashboardLayout = ({
  history,
  showResearchers = true,
  classes = {},
  showMobileHeader = true,
  children
}) => {
  return (
    <div className={cx('page', styles.container)}>
      {showMobileHeader && (
        <MobileOnly>
          <MobileHeader
            showBack={true}
            goBack={history.goBack}
            classes={styles}
          />
        </MobileOnly>
      )}

      {children}

      {showResearchers && (
        <div className={cx(styles.researchers, classes.researchers)}>
          <ResearchesBlock />
        </div>
      )}

      <CommonFooter />
    </div>
  )
}

export default withRouter(DashboardLayout)
