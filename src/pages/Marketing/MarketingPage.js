import React from 'react'
import cx from "classnames";
import ProMetricsFooter from "../ProMetrics/ProMetricsFooter/ProMetricsFooter";
import styles from './MarketingPage.module.scss'

const MarketingPage = () => {
  return <div className={cx('page', styles.container)}>
    MarketingPage

    <ProMetricsFooter />
  </div>
}

export default MarketingPage
