import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Label from '@santiment-network/ui/Label'
import Plan from './Plan'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import { getCurrentSanbaseSubscription, noBasicPlan } from '../../utils/plans'
import { usePlans } from '../../ducks/Plans/hooks'
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

const Plans = ({
  id,
  classes = {},
  onDialogClose,
  isLoggedIn,
  subscription
}) => {
  const [billing, setBilling] = React.useState('year')
  const [plans] = usePlans()

  const userPlan = subscription && subscription.plan.id
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

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
      <div className={styles.cards}>
        {plans
          .filter(noBasicPlan)
          .filter(
            ({ name, interval }) => interval === billing || name === 'FREE'
          )
          .sort(({ id: a }, { id: b }) => a - b)
          .map(plan => (
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
          ))}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  subscription: getCurrentSanbaseSubscription(state.user.data)
})

export default connect(mapStateToProps)(Plans)
