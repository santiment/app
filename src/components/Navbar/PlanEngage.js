import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Skeleton from '../Skeleton/Skeleton'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './PlanEngage.module.scss'

export const getTrialDaysLeft = () => ''

export const getDaysLeftLabel = daysLeft =>
  daysLeft === 1 ? 'last day' : `${daysLeft} days left`

const PlanEngage = () => {
  const { user, loading: isUserLoading } = useUser()
  const {
    loading,
    isPro,
    isProPlus,
    trialDaysLeft
  } = useUserSubscriptionStatus()

  const isLoading = isUserLoading || loading

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Skeleton className={styles.loader} repeat={1} show={loading} />
      </div>
    )
  }

  if (!user && !isLoading) {
    return (
      <div className={styles.wrapper}>
        <Link to='/login' className={cx(styles.text, styles.link)}>
          Log in
        </Link>
      </div>
    )
  }

  if (!isPro && !isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={cx(styles.text, styles.free)}>
          Free plan
          <Link to='/pricing' className={styles.upgrade}>
            Upgrade
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://academy.santiment.net/products-and-plans/sanbase-pro-features/'
        className={cx(styles.text, styles.premium)}
      >
        <Icon type='crown' className={styles.icon} />
        Pro{isProPlus && '+'}{' '}
        {trialDaysLeft && `Trial (${getDaysLeftLabel(trialDaysLeft)})`}
      </a>
    </div>
  )
}

export default PlanEngage
