import React from 'react'
import Plans from './Plans/Plans'
import PayWithCrypto from './PayWithCrypto'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import UpgradeInfo from './UpgradeInfo/UpgradeInfo'
import SpeakBlocks from './SpeakBlocks/SpeakBlocks'
import PlanDescriptions from './PlanDescriptions/PlanDescriptions'
import styles from './index.module.scss'

const Header = () => {
  const { trialDaysLeft } = useUserSubscriptionStatus()

  return (
    <div className={styles.top}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Be ahead of the game in crypto</h1>

        <h2 className={styles.description}>
          Choose the plan which fits your needs and enjoy our premium metrics
          {trialDaysLeft && (
            <div className={styles.trial}>
              ({trialDaysLeft} in your free trial)
            </div>
          )}
        </h2>
      </div>
      <div className={styles.img} />
    </div>
  )
}

const Page = () => {
  return (
    <DashboardLayout showResearchers={false}>
      <div className={styles.inner}>
        <Header />

        <Plans id='plans' classes={styles} />

        <PlanDescriptions />

        <PayWithCrypto />

        <SpeakBlocks />
      </div>

      <UpgradeInfo />
    </DashboardLayout>
  )
}

export default Page
