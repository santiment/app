import React from 'react'
import { Query } from 'react-apollo'
import cx from 'classnames'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Label from '@santiment-network/ui/Label'
import Plan from './Plan'
import {
  findSanbasePlan,
  getCurrentSanbaseSubscription
} from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY, PLANS_QUERY } from '../../queries/plans'
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

export default ({ classes = {}, onDialogClose }) => {
  const [billing, setBilling] = React.useState('year')
  return (
    <>
      <div className={cx(styles.billing, classes.billing)}>
        <RadioBtns
          options={billingOptions}
          defaultSelectedIndex='year'
          labelOnRight
          onSelect={res => setBilling(res)}
          className={styles.bill}
        />
      </div>
      <Query query={USER_SUBSCRIPTIONS_QUERY}>
        {({ data: { currentUser } }) => {
          const subscription = getCurrentSanbaseSubscription(currentUser)
          const userPlan = subscription && subscription.plan.id
          const isSubscriptionCanceled =
            subscription && subscription.cancelAtPeriodEnd
          return (
            <Query query={PLANS_QUERY}>
              {({ data: { productsWithPlans = [] } }) => {
                const product = productsWithPlans.find(findSanbasePlan)
                if (!product) {
                  return null
                }

                return (
                  <>
                    <div className={styles.cards}>
                      {product.plans
                        .filter(
                          ({ name, interval }) =>
                            interval === billing || name === 'FREE'
                        )
                        .sort(({ id: a }, { id: b }) => a - b)
                        .map(plan => (
                          <Plan
                            key={plan.id}
                            {...plan}
                            isLoggedIn={currentUser}
                            billing={billing}
                            product={product}
                            userPlan={userPlan}
                            subscription={subscription}
                            isSubscriptionCanceled={isSubscriptionCanceled}
                          />
                        ))}
                    </div>
                  </>
                )
              }}
            </Query>
          )
        }}
      </Query>
    </>
  )
}
