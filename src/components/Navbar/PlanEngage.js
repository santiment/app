import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { useUser } from '../../contexts/user'
import { useUserSubscriptionStatus } from '../../contexts/user/subscriptions'
import styles from './PlanEngage.module.scss'

export const getTrialDaysLeft = () => ''

export const getDaysLeftLabel = daysLeft =>
  daysLeft === 1 ? 'last day' : `${daysLeft} days left`

const PlanEngage = ({ currentUser }) => {
  const { user } = useUser()
  const { loading, isPro, trialDaysLeft } = useUserSubscriptionStatus()

  if (loading) return null

  if (!user) {
    return (
      <Link to='/login' className={cx(styles.text, styles.link)}>
        Log in
      </Link>
    )
  }

  if (!isPro) {
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
      target='_blank'
      rel='noopener noreferrer'
      href='https://academy.santiment.net/products-and-plans/sanbase-pro-features/'
      className={cx(styles.text, styles.premium)}
    >
      <Icon type='crown' className={styles.icon} />
      Pro {trialDaysLeft && `Trial (${getDaysLeftLabel(trialDaysLeft)})`}
    </a>
  )
}

export default PlanEngage
