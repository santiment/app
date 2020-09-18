import React from 'react'
import cx from 'classnames'
import TopClaimersTable from './TopClaimers/TopClaimersTable'
import AmountClaimedChart from './AmountClaimed/AmountClaimedChart'
import styles from './index.module.scss'

const ClaimersWidgets = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.item}>
        <h3 className={styles.subheading}>Amount Claimed</h3>
        <AmountClaimedChart className={styles.widget} />
      </div>
      <div className={styles.item}>
        <h3 className={styles.subheading}>Top Claimers, 24h</h3>
        <TopClaimersTable className={styles.widget} />
      </div>
    </div>
  )
}

export default ClaimersWidgets
