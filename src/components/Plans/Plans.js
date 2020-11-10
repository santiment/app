import React from 'react'
import cx from 'classnames'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Label from '@santiment-network/ui/Label'
import Plan from './Plan'
import { usePlans } from '../../ducks/Plans/hooks'
import { useUser } from '../../stores/user'
import { useUserSubscription } from '../../stores/user/subscriptions'
import { getShowingPlans } from '../../utils/plans'
import styles from './Plans.module.scss'

const billingOptions = [
  {
    index: 'year',
    content: (
      <>
        Bill yearly <Label accent='waterloo'>(save 10%)</Label>
      </>
    )
  },
  { index: 'month', content: 'Bill monthly' }
]

const Plans = ({ id, onDialogClose, classes = {} }) => {
  const { user } = useUser()
  const { subscription } = useUserSubscription()
  const [billing, setBilling] = React.useState('year')
  const [plans] = usePlans()

  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

  const showingPlans = getShowingPlans(plans, billing)

  return (
    <>
      <div id={id} className={cx(styles.billing, classes.billing)}>
        <RadioBtns
          options={billingOptions}
          defaultSelectedIndex='year'
          labelOnRight
          onSelect={res => setBilling(res)}
          className={styles.bill}
        />
      </div>
      <div className={cx(styles.cards, classes.cards)}>
        {showingPlans.map(plan => (
          <Plan
            key={plan.id}
            plan={plan}
            isLoggedIn={user}
            billing={billing}
            plans={plans}
            subscription={subscription}
            isSubscriptionCanceled={isSubscriptionCanceled}
            onDialogClose={onDialogClose}
            btnProps={{
              accent: 'orange'
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Plans
