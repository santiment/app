import React from 'react'
import cx from 'classnames'
import UniswapChart from './Chart'
import { Metric } from '../../ducks/dataHub/metrics'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import { ProLabel } from '../ProLabel'
import styles from './index.module.scss'

const Widget = ({ title, description, children, showPro = false }) => (
  <div className={styles.item}>
    <h3 className={styles.subheading}>
      {title}
      {description && (
        <HelpPopup triggerClassName={styles.help} content={description} />
      )}

      {showPro && <ProLabel className={styles.pro} />}
    </h3>
    {children}
  </div>
)

const ChartWidget = ({ metric }) => (
  <Widget title={metric.label} description={metric.description}>
    <UniswapChart metric={metric} />
  </Widget>
)

const ClaimersWidgets = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {/* <ChartWidget metric={Metric.uniswap_total_claims_percent} /> */}

      <ChartWidget metric={Metric.uniswap_claims_amount} />
      <ChartWidget metric={Metric.uniswap_total_claims_amount} />

      <ChartWidget metric={Metric.uniswap_claims_count} />
      <ChartWidget metric={Metric.uniswap_total_claims_count} />

      <ChartWidget metric={Metric.uniswap_user_claims_count} />
      <ChartWidget metric={Metric.uniswap_total_user_claims_count} />

      <ChartWidget metric={Metric.uniswap_user_claims_amount} />
      <ChartWidget metric={Metric.uniswap_total_user_claims_amount} />

      <ChartWidget metric={Metric.uniswap_lp_claims_count} />
      <ChartWidget metric={Metric.uniswap_total_lp_claims_count} />

      <ChartWidget metric={Metric.uniswap_lp_claims_amount} />
      <ChartWidget metric={Metric.uniswap_total_lp_claims_amount} />
    </div>
  )
}

export default ClaimersWidgets
