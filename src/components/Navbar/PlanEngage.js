import React from 'react'
import cx from 'classnames'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import styles from './PlanEngage.module.scss'

const PlanEngage = () => (
  <Query query={USER_SUBSCRIPTIONS_QUERY}>
    {({ loading, data: { currentUser } = {} }) => {
      if (loading) {
        return null
      }

      if (!currentUser) {
        return (
          <Link to='/login' className={cx(styles.text, styles.link)}>
            Sign in
          </Link>
        )
      }

      const subscription = getCurrentSanbaseSubscription(currentUser)

      if (!subscription || subscription.plan.name === 'FREE') {
        return (
          <div className={cx(styles.text, styles.free)}>
            Free plan
            <Link to='/pricing' className={styles.upgrade}>
              Upgrade
            </Link>
          </div>
        )
      }

      return (
        <a
          href='https://academy.santiment.net/'
          className={cx(styles.text, styles.premium)}
        >
          <Icon type='crown' className={styles.icon} />
          Premium
        </a>
      )
    }}
  </Query>
)

export default PlanEngage
