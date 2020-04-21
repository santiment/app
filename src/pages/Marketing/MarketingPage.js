import React from 'react'
import cx from "classnames";
import ProMetricsFooter from "../ProMetrics/ProMetricsFooter/ProMetricsFooter";
import StoriesList from "../../components/Stories/StoriesList";
import styles from './MarketingPage.module.scss'

const MarketingPage = () => {
  return <div className={cx('page', styles.container)}>

    <StoriesList classes={styles} showScrollBtns />


    MarketingPage

    <ProMetricsFooter />
  </div>
}

export default MarketingPage
