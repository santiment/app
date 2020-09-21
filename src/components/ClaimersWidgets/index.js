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

const ChartWidget = ({ metrics }) => (
  <Widget title={metrics[0].label} description={metrics[0].description}>
    <UniswapChart metrics={metrics} />
  </Widget>
)

const ClaimersWidgets = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <ChartWidget metrics={[Metric.uniswap_claims_amount]} />
      <ChartWidget
        metrics={[
          Metric.uniswap_total_claims_amount,
          Metric.uniswap_total_claims_percent
        ]}
      />

      <ChartWidget metrics={[Metric.uniswap_claims_count]} />
      <ChartWidget metrics={[Metric.uniswap_total_claims_count]} />

      <ChartWidget metrics={[Metric.uniswap_user_claims_count]} />
      <ChartWidget metrics={[Metric.uniswap_total_user_claims_count]} />

      <ChartWidget metrics={[Metric.uniswap_user_claims_amount]} />
      <ChartWidget metrics={[Metric.uniswap_total_user_claims_amount]} />

      <ChartWidget metrics={[Metric.uniswap_lp_claims_count]} />
      <ChartWidget metrics={[Metric.uniswap_total_lp_claims_count]} />

      <ChartWidget metrics={[Metric.uniswap_lp_claims_amount]} />
      <ChartWidget metrics={[Metric.uniswap_total_lp_claims_amount]} />
    </div>
  )
}

export default ClaimersWidgets
