import React from 'react'
import { Query } from 'react-apollo'
import cx from 'classnames'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Label from '@santiment-network/ui/Label'
import Plan from './Plan'
import {
  findNeuroPlan,
  getCurrentNeuroSubscription,
  formatPrice,
  getAlternativeBillingPlan
} from '../../utils/plans'
import { CURRENT_USER_QUERY, PLANS_QUERY } from '../../queries/plans'
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
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { currentUser } }) => {
          const subscription = getCurrentNeuroSubscription(currentUser)
          const userPlan = subscription && subscription.plan.id
          const isSubscriptionCanceled =
            subscription && subscription.cancelAtPeriodEnd
          return (
            <Query query={PLANS_QUERY}>
              {({ data: { productsWithPlans = [] } }) => {
                const neuro = productsWithPlans.find(findNeuroPlan)
                if (!neuro) {
                  return null
                }

                return (
                  <>
                    <div className={styles.cards}>
                      {neuro.plans
                        .filter(
                          ({ name, interval }) =>
                            interval === billing || name === 'FREE'
                        )
                        .map(plan => (
                          <Plan {...plan} />
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
