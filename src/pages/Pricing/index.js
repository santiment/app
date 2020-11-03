import React from 'react'
import Button from '@santiment-network/ui/Button'
import Plans from './Plans'
import Testimonials from '../../components/Testimonials'
import PayWithCrypto from './PayWithCrypto'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
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

        <Testimonials />

        <section className={styles.ready}>
          <div className={styles.ready__content}>
            <h2 className={styles.ready__title}>Ready to upgrade?</h2>
            <h4 className={styles.ready__text}>
              Click below to access the SanAPI or join the Discord channel to
              share your solutions with the world
            </h4>
            <Button
              variant='fill'
              accent='positive'
              className={styles.ready__btn}
              as='a'
              href='#plans'
            >
              Choose plan
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Page
