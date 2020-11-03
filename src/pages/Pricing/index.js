import React from 'react'
import Plans from './Plans'
import PayWithCrypto from './PayWithCrypto'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import UpgradeInfo from './UpgradeInfo/UpgradeInfo'
import styles from './index.module.scss'

const Header = () => (
  <div className={styles.top}>
    <div className={styles.headerContent}>
      <h1 className={styles.title}>Be ahead of the game in crypto</h1>

      <h2 className={styles.description}>
        Choose the plan which fits your needs and enjoy our premium metrics
      </h2>
    </div>
    <div className={styles.img} />
  </div>
)

const Page = () => {
  const { trialDaysLeft } = useUserSubscriptionStatus()

  return (
    <DashboardLayout showResearchers={false}>
      <div className={styles.inner}>
        <Header />

        {trialDaysLeft && (
          <div className={styles.trial}>{trialDaysLeft} in your free trial</div>
        )}

        <Plans id='plans' classes={styles} />

        <PayWithCrypto />
      </div>

      <UpgradeInfo />
    </DashboardLayout>
  )
}

export default Page
