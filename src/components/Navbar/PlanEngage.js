import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { dateDifference, DAY } from '../../utils/dates'
import styles from './PlanEngage.module.scss'

export const getTrialDaysLeft = subscription => {
  if (!subscription) return

  let trialEnd = subscription.trialEnd
  if (!trialEnd) return

  const { diff, format } = dateDifference({
    from: new Date(),
    to: new Date(trialEnd),
    format: DAY
  })

  if (diff < 0) return

  if (format !== DAY) {
    return 'last day'
  }

  const daysNumber = diff + 1

  const daysLeft = daysNumber === 1 ? 'last day' : `${daysNumber} days left`

  return daysLeft
}

const PlanEngage = ({ isLoading, currentUser }) => {
  if (isLoading) return null

  if (!currentUser.id) {
    return (
      <Link to='/login' className={cx(styles.text, styles.link)}>
        Log in
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
