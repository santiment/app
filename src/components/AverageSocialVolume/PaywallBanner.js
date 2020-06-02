import React from 'react'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './PaywallBanner.module.scss'

const PaywallBanner = () => (
  <div className={styles.wrapper}>
    <h4 className={styles.title}>Why is some of the data hidden?</h4>
    <div className={styles.desc}>
      To get the full breakdown of our social metrics, upgrade your account to
      PRO!
    </div>
    <UpgradeBtn className={styles.button} variant='fill' />
  </div>
)

export default PaywallBanner
