import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { dateDifference, DAY } from '../../utils/dates'
import styles from './PlanEngage.module.scss'

const getTrialDaysLeft = subscription => {
  let trialEnd = subscription.trialEnd
  if (!trialEnd) return ''

  const daysNumber =
    dateDifference({
      from: new Date(),
      to: new Date(trialEnd),
      format: DAY
    }).diff + 1

  const daysLeft = daysNumber === 1 ? 'last day' : `${daysNumber} days left`

  return daysLeft
}

const PlanEngage = ({ isLoading, currentUser }) => {
  if (isLoading) return null

  if (!currentUser.id) {
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

  const trialDaysLeft = getTrialDaysLeft(subscription)

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://academy.santiment.net/products-and-plans/sanbase-pro-features/'
      className={cx(styles.text, styles.premium)}
    >
      <Icon type='crown' className={styles.icon} />
      Pro {trialDaysLeft && `Trial (${trialDaysLeft})`}
    </a>
  )
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  currentUser: state.user.data
})

export default connect(mapStateToProps)(PlanEngage)
