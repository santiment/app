import React from 'react'
import { graphql } from 'react-apollo'
import { EMAIL_LOGIN_MUTATION } from '../../components/SubscriptionForm/loginGQL'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import styles from './DashboardPage.module.scss'

const DashboardPageSubscription = () => {
  return (
    <div className={styles.subscription}>
      <div className={styles.subscription__title}>Advanced market research</div>
      <div className={styles.subscription__text}>
        Optimal way to be informed about fresh news and summaries from the world
        of crypto
      </div>
      <SubscriptionForm />
    </div>
  )
}

export default graphql(EMAIL_LOGIN_MUTATION, { name: 'emailLogin' })(
  DashboardPageSubscription
)
