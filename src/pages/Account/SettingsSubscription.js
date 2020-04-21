import React from 'react'
import { Query, Mutation } from 'react-apollo'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Settings from './Settings'
import PlansDialog from '../../components/Plans/PlansDialog'
import CancelSubscriptionDialog from '../../components/SubscriptionCancelDialog/SubscriptionCancelDialog'
import ChangeBillingDialog from '../../components/BillingChangeDialog/BillingChangeDialog'
import PLANS from '../../components/Plans/list.js'
import {
  getCurrentSanbaseSubscription,
  formatPrice,
  getTrialLabel
} from '../../utils/plans'
import { getDateFormats } from '../../utils/dates'
import {
  USER_SUBSCRIPTIONS_QUERY,
  RENEW_SUBSCRIPTION_MUTATION
} from '../../queries/plans'
import styles from './SettingsSubscription.module.scss'

const PERIOD_END_ACTION = {
  false: 'renew',
  true: 'cancel'
}

const PlanText = ({ subscription }) => {
  if (subscription) {
    const {
      currentPeriodEnd,
      cancelAtPeriodEnd,
      plan: { amount, name, interval, isDeprecated },
      trialEnd
    } = subscription

    const { MMMM, DD, YYYY } = getDateFormats(new Date(currentPeriodEnd))
    const [price] = formatPrice(amount, name)
    const notCanceled = !cancelAtPeriodEnd

    return (
      <>
        <div className={styles.title}>
          {PLANS[name].title} Plan {getTrialLabel(trialEnd)}
          {isDeprecated && (
            <span className={styles.deprecated}>Deprecated</span>
          )}
        </div>
        {trialEnd ? null : (
          <div className={styles.desc}>
            {price} per {interval}.{' '}
            {notCanceled && (
              <ChangeBillingDialog
                subscription={subscription}
                classes={styles}
              />
            )}
          </div>
        )}
        <div className={styles.desc}>
          Will automatically{' '}
          {PERIOD_END_ACTION[Boolean(trialEnd) || cancelAtPeriodEnd]} on {MMMM}{' '}
          {DD}, {YYYY}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.title}>Free Plan</div>
      <div className={styles.desc}>
        You can see data{' '}
        <Button accent='blue' className={styles.btn}>
          generated 24h ago.
        </Button>
      </div>
      <div className={styles.desc}>Upgrade your plan to get more abilities</div>
    </>
  )
}

const SubscriptionRenewButton = ({ subscription: { id } = {} }) => {
  return (
    <Mutation mutation={RENEW_SUBSCRIPTION_MUTATION}>
      {(renew, { loading }) => (
        <div className={styles.renew}>
          <Button
            variant='fill'
            accent='positive'
            isLoading={loading}
            onClick={() => renew({ variables: { id: +id } })}
          >
            Renew Subscription
          </Button>
        </div>
      )}
    </Mutation>
  )
}

const SettingsSubscription = () => {
  return (
    <Query query={USER_SUBSCRIPTIONS_QUERY}>
      {({ data: { currentUser = {} } = {} }) => {
        const subscription = getCurrentSanbaseSubscription(currentUser)
        const notCanceled = subscription && !subscription.cancelAtPeriodEnd

        const PlanBtn =
          !subscription || notCanceled ? PlansDialog : SubscriptionRenewButton

        return (
          <Settings id='subscription' header='Subscription'>
            <Settings.Row>
              <Panel className={styles.plan}>
                <div>
                  <PlanText subscription={subscription} />
                </div>
                <PlanBtn subscription={subscription} />
              </Panel>
            </Settings.Row>
            {notCanceled && (
              <Settings.Row>
                <div>
                  <div>Cancel subscription</div>

                  <Label accent='waterloo'>
                    If you cancel your subscription, you will not be able to see
                    the most recent data
                  </Label>
                </div>
                <CancelSubscriptionDialog subscription={subscription} />
              </Settings.Row>
            )}
          </Settings>
        )
      }}
    </Query>
  )
}

export default SettingsSubscription
