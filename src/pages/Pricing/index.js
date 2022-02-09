import React from 'react'
import Plans from './Plans/Plans'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import PricingFAQ from './PricingFAQ/PricingFAQ'
import Testimonials from '../../components/Testimonials'
import TwitterFeedbacks from '../../pages/Pricing/TwitterFeedbacks/TwitterFeedbacks'
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

const Page = () => (
  <DashboardLayout showResearchers={false}>
    <div className={styles.inner}>
      <Header />
      <Plans id='plans' classes={styles} />
      <Testimonials slice={3} wrapperClass={styles.testimonials} />
      <TwitterFeedbacks />
      <PricingFAQ />
    </div>
  </DashboardLayout>
)

export default Page
