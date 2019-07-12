import React from 'react'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import styles from './DashboardPage.module.scss'

const DashboardPageSubscription = () => {
  return (
    <div className={styles.subscription}>
      <div className={styles.subscription__title}>Market briefs done right</div>
      <div className={styles.subscription__text}>
        Receive curated news and exclusive Santiment analysis about the crypto
        market
      </div>
      <SubscriptionForm />
    </div>
  )
}

export default DashboardPageSubscription
