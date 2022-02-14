import React from 'react'
import Twitter from '@santiment-network/ui/Twitter'
import Plans from './Plans/Plans'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { useUser } from '../../stores/user'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import SpeakBlocks from './SpeakBlocks/SpeakBlocks'
import PricingFAQ from './PricingFAQ/PricingFAQ'
import Testimonials from '../../components/Testimonials'
import Companies from '../..//pages/Pricing/Companies/Companies'
import styles from './index.module.scss'

const Header = ({ trialDaysLeft }) => (
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

const Page = () => {
  const { user } = useUser()
  const { trialDaysLeft, isPro, isProPlus } = useUserSubscriptionStatus()
  const showConversion = !user || (!isPro && !isProPlus)

  return (
    <DashboardLayout showResearchers={false}>
      <div className={styles.inner}>
        <Header trialDaysLeft={trialDaysLeft} />
        <Plans id='plans' classes={styles} />
        {showConversion && (
          <>
            <Companies
              header={
                <div className={styles.companiesHeader}>
                  You are in good company
                </div>
              }
            />
            <Testimonials slice={3} wrapperClass={styles.testimonials} />
            <Twitter />
          </>
        )}
        <PricingFAQ />
        {showConversion && <SpeakBlocks />}
      </div>
    </DashboardLayout>
  )
}

export default Page
