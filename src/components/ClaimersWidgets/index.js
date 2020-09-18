import React from 'react'
import cx from 'classnames'
import UniswapChart from './Chart'
import TopClaimersTable from './TopClaimers/TopClaimersTable'
import { Metric } from '../../ducks/dataHub/metrics'
import styles from './index.module.scss'

const ClaimersWidgets = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.item}>
        <h3 className={styles.subheading}>Amount Claimed</h3>
        <UniswapChart metric={Metric.uniswap_total_claims_amount} />
      </div>
      <div className={styles.item}>
        <h3 className={styles.subheading}>Top Claimers, 24h</h3>
        <TopClaimersTable className={styles.widget} />
      </div>
    </div>
  )
}

export default ClaimersWidgets
