import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Plan from './Plan'
import { getCurrentSanbaseSubscription, noBasicPlan } from '../../utils/plans'
import { usePlans } from '../../ducks/Plans/hooks'
import { checkIsLoggedIn } from '../UserSelectors'
import Enterprise from './Enterprise'
import styles from './Plans.module.scss'

const Billing = ({ selected, onClick }) => {
  const isYearSelected = selected === 'year'
  return (
    <>
      <span
        onClick={() => onClick('month')}
        className={cx(
          styles.billing__option,
          !isYearSelected && styles.billing__option_active
        )}
      >
        Bill monthly
      </span>
      <Toggle
        className={styles.billing__toggle}
        isActive={isYearSelected}
        onClick={() => onClick(isYearSelected ? 'month' : 'year')}
      />
      <span
        className={cx(
          styles.billing__option,
          styles.billing__option_year,
          isYearSelected && styles.billing__option_active
        )}
        onClick={() => onClick('year')}
      >
        Bill yearly
        <span className={styles.billing__save}>save 10%!</span>
      </span>
    </>
  )
}

const Plans = ({ id, classes = {}, subscription, isLoggedIn }) => {
  const [billing, setBilling] = useState('year')
  const [plans] = usePlans()

  const userPlan = subscription && subscription.plan.id
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

  return (
    <>
      <div id={id} className={cx(styles.billing, classes.billing)}>
        <Billing selected={billing} onClick={setBilling} />
      </div>
      <div className={styles.cards}>
        {plans
          .filter(noBasicPlan)
          .filter(
            ({ name, interval }) => interval === billing || name === 'FREE'
          )
          .map(plan =>
            plan.name === 'ENTERPRISE' ? (
              <Enterprise key={plan.id} />
            ) : (
              <Plan
                key={plan.id}
                {...plan}
                isLoggedIn={isLoggedIn}
                billing={billing}
                plans={plans}
                userPlan={userPlan}
                subscription={subscription}
                isSubscriptionCanceled={isSubscriptionCanceled}
              />
            )
          )}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  subscription: getCurrentSanbaseSubscription(state.user.data)
})

export default connect(mapStateToProps)(Plans)
