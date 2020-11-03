import React, { useState } from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Plan from './Plan'
import { noBasicPlan, noEnterprisePlan } from '../../utils/plans'
import { usePlans } from '../../ducks/Plans/hooks'
import { useUser } from '../../stores/user'
import { useUserSubscription } from '../../stores/user/subscriptions'
import styles from './Plans.module.scss'

const Billing = ({ selected, onClick }) => {
  const isYearSelected = selected === 'year'
  return (
    <>
      <span
        onClick={() => onClick('month')}
        className={cx(
          styles.billing__option,
          styles.billing__montly,
          !isYearSelected && styles.billing__option_active
        )}
      >
        Monthly
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
        Yearly
        <span className={styles.billing__save}>(Save 20%)</span>
      </span>
    </>
  )
}

const Plans = ({ id, classes = {} }) => {
  const { user } = useUser()
  const { subscription } = useUserSubscription()
  const [billing, setBilling] = useState('month')
  const [plans] = usePlans()

  const userPlan = subscription && subscription.plan.id
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

  const filteredPlans = plans
    .filter(noBasicPlan)
    .filter(noEnterprisePlan)
    .filter(({ name, interval }) => interval === billing || name === 'FREE')

  return (
    <>
      <div id={id} className={cx(styles.billing, classes.billing)}>
        <Billing selected={billing} onClick={setBilling} />
      </div>
      <div
        className={cx(
          styles.cards,
          filteredPlans.length === 2 && styles.cards__two
        )}
      >
        {filteredPlans.map(plan => (
          <Plan
            key={plan.id}
            {...plan}
            isLoggedIn={user}
            billing={billing}
            plans={plans}
            userPlan={userPlan}
            subscription={subscription}
            isSubscriptionCanceled={isSubscriptionCanceled}
          />
        ))}
      </div>
    </>
  )
}

export default Plans
