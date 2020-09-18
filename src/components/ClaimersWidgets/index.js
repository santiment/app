import React from 'react'
import cx from 'classnames'
import UniswapChart from './Chart'
import TopClaimersTable from './TopClaimers/TopClaimersTable'
import { Metric } from '../../ducks/dataHub/metrics'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const Widget = ({ title, description, children }) => (
  <div className={styles.item}>
    <h3 className={styles.subheading}>
      {title}
      {description && (
        <HelpPopup triggerClassName={styles.help} content={description} />
      )}
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
      <div className={styles.claimers}>
        <h3 className={styles.subheading}>Top Claimers, 24h</h3>
        <TopClaimersTable className={cx(styles.widget, styles.chart)} />
      </div>

      <ChartWidget metric={Metric.uniswap_total_claims_percent} />

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
