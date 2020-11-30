import React, { useState } from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import PricingPlan from '../Plan/PricingPlan'
import { usePlans } from '../../../ducks/Plans/hooks'
import { useUserSubscription } from '../../../stores/user/subscriptions'
import PlanDetails from '../PlanDetails/PlanDetails'
import { getShowingPlans } from '../../../utils/plans'
import { Skeleton } from '../../../components/Skeleton'
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
  const { subscription } = useUserSubscription()
  const [billing, setBilling] = useState('year')
  const [plans, loading] = usePlans()

  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

  const showingPlans = getShowingPlans(plans, billing)

  if (loading) {
    return <Skeleton show={loading} className={styles.skeleton} />
  }

  return (
    <>
      <div id={id} className={cx(styles.billing, classes.billing)}>
        <Billing selected={billing} onClick={setBilling} />
      </div>
      <div
        className={cx(
          styles.cards,
          showingPlans.length === 2 && styles.cards__two
        )}
      >
        {showingPlans.map(plan => (
          <PricingPlan
            key={plan.id}
            plan={plan}
            billing={billing}
            plans={plans}
            subscription={subscription}
            isSubscriptionCanceled={isSubscriptionCanceled}
          />
        ))}
      </div>

      <PlanDetails
        plans={plans}
        billing={billing}
        subscription={subscription}
      />
    </>
  )
}

export default Plans
