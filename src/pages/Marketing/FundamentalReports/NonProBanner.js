import React from 'react'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './NonProBanner.module.scss'

const NonProBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>Why those reports are hidden?</div>

      <div className={styles.bg} />

      <div className={styles.description}>
        To unlock the full potential of Santiment metrics you need to upgrade
        your account to PRO
      </div>

      <UpgradeBtn className={styles.upgradeBtn} />
    </div>
  )
}

export default NonProBanner
