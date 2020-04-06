import React from 'react'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './PaywallBanner.module.scss'

const PaywallBanner = () => (
  <div className={styles.wrapper}>
    <h4 className={styles.title}>Why those data is hidden?</h4>
    <div className={styles.desc}>
      To unlock the full potential of Santiment metrics you need to upgrade your
      account to PRO
    </div>
    <UpgradeBtn className={styles.button} variant='fill' />
  </div>
)

export default PaywallBanner
