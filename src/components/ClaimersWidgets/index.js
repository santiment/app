import React, { useRef } from 'react'
import cx from 'classnames'
import UniswapChart from './Chart'
import { ProLabel } from '../ProLabel'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import { Metric } from '../../ducks/dataHub/metrics'
import { useSyncDateObserver, useSyncDateEffect } from '../../ducks/Chart/sync'
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

export const ChartWidget = ({ metrics, syncDate, observeSyncDate }) => {
  const chartRef = useRef(null)

  useSyncDateEffect(chartRef, observeSyncDate)

  return (
    <Widget title={metrics[0].label} description={metrics[0].description}>
      <UniswapChart
        chartRef={chartRef}
        metrics={metrics}
        syncTooltips={syncDate}
      />
    </Widget>
  )
}

const ClaimersWidgets = ({ className }) => {
  const props = useSyncDateObserver()

  return (
    <div className={cx(styles.wrapper, className)}>
      <ChartWidget {...props} metrics={[Metric.uniswap_claims_amount]} />
      <ChartWidget {...props} metrics={[Metric.uniswap_user_claims_amount]} />
      <ChartWidget {...props} metrics={[Metric.uniswap_lp_claims_amount]} />

      <ChartWidget {...props} metrics={[Metric.uniswap_claims_count]} />
      <ChartWidget {...props} metrics={[Metric.uniswap_user_claims_count]} />
      <ChartWidget {...props} metrics={[Metric.uniswap_lp_claims_count]} />
    </div>
  )
}

export default ClaimersWidgets
