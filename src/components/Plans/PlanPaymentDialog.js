import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { Elements, injectStripe } from 'react-stripe-elements'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import IconLock from './IconLock'
import IconDollar from './IconDollar'
import { showNotification } from '../../actions/rootActions'
import {
  USER_SUBSCRIPTIONS_QUERY,
  SUBSCRIBE_MUTATION
} from '../../queries/plans'
import { formatError, contactAction } from '../../utils/notifications'
import { getDateFormats } from '../../utils/dates'
import { getAlternativeBillingPlan } from '../../utils/plans'
import { usePlans } from '../../ducks/Plans/hooks'
import { useTrackEvents } from '../../hooks/tracking'
import { USER_SUBSCRIPTION_CHANGE } from '../../actions/types'
import { updateUserSubscriptions } from '../../stores/user/subscriptions'
import FreeTrialLabel from './PlanDialogLabels/FreeTrialLabel'
import ProExpiredLabel from './PlanDialogLabels/ProExpiredLabel'
import styles from './PlanPaymentDialog.module.scss'
import sharedStyles from './Plans.module.scss'

function useFormLoading () {
  const [loading, setLoading] = useState(false)
  function toggleLoading () {
    setLoading(state => !state)
  }
  return [loading, toggleLoading]
}

function updateCache (cache, { data: { subscribe } }) {
  const { currentUser } = cache.readQuery({ query: USER_SUBSCRIPTIONS_QUERY })

  let subscriptions = currentUser.subscriptions
    ? [subscribe, ...currentUser.subscriptions]
    : [subscribe]

  updateUserSubscriptions(subscriptions)

  cache.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: { currentUser: { ...currentUser, subscriptions } }
  })
}

const Form = props => <Panel as='form' {...props} />

const getTokenDataByForm = form => {
  const res = {}
  new FormData(form).forEach((value, key) => {
    if (key === 'coupon') {
      return
    }
    res[key] = value
  })
  return res
}

const NEXT_DATE_GET_SET_MONTH = ['setMonth', 'getMonth']
const NEXT_DATE_GET_SET_YEAR = ['setFullYear', 'getFullYear']
const getNextPaymentDates = billing => {
  const [setter, getter] =
    billing === 'year' ? NEXT_DATE_GET_SET_YEAR : NEXT_DATE_GET_SET_MONTH

  const date = new Date()
  date[setter](date[getter]() + 1)

  const { DD, MM, YY } = getDateFormats(date)

  return `${DD}/${MM}/${YY}`
}

const PlanPaymentDialog = ({
  title: name,
  billing: interval,
  label,
  price: amount,
  planId: id,
  stripe,
  disabled,
  addNot,
  btnProps,
  updateSubscription,
  subscription
}) => {
  const [plans] = usePlans()
  const [loading, toggleLoading] = useFormLoading()
  const [paymentVisible, setPaymentVisiblity] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState({})
  const [trackEvent] = useTrackEvents()

  const {
    id: planId,
    name: title,
    interval: billing,
    amount: price
  } = selectedPlan

  console.log('subscription', subscription)

  useEffect(
    () => {
      setSelectedPlan({
        id,
        name,
        interval,
        amount
      })
    },
    [id, name, amount, interval]
  )

  function changeSelectedPlan (interval) {
    if (selectedPlan.interval !== interval) {
      setSelectedPlan(getAlternativeBillingPlan(plans, selectedPlan))
    }
  }

  function hidePayment () {
    setPaymentVisiblity(false)
  }

  function showPayment () {
    trackEvent({
      category: 'User',
      action: 'Payment form opened'
    })
    setPaymentVisiblity(true)
  }

  const nextPaymentDate = getNextPaymentDates(billing)

  const isTrial = subscription && subscription.trialEnd

  return (
    <>
      <Button
        className={sharedStyles.link}
        fluid
        border
        accent='positive'
        {...btnProps}
        disabled={disabled}
        onClick={showPayment}
      >
        {label}
      </Button>

      <Mutation mutation={SUBSCRIBE_MUTATION} update={updateCache}>
        {(subscribe, { called, error, data }) => {
          return (
            <Dialog
              title='Payment details'
              classes={styles}
              open={paymentVisible}
              onClose={hidePayment}
              as={Form}
              modalProps={{
                onSubmit: e => {
                  e.preventDefault()

                  if (loading) return
                  toggleLoading()

                  trackEvent({
                    category: 'User',
                    action: 'Payment form submitted'
                  })

                  const form = e.currentTarget
                  const formCoupon = form.coupon
                  const coupon =
                    formCoupon.dataset.isValid === 'true' && formCoupon.value

                  stripe
                    .createToken(getTokenDataByForm(form))
                    .then(({ token, error }) => {
                      if (error) {
                        return Promise.reject(error)
                      }
                      const variables = { cardToken: token.id, planId: +planId }

                      if (coupon) {
                        variables.coupon = coupon
                      }

                      return subscribe({
                        variables
                      })
                    })
                    .then(({ data: { subscribe } }) => {
                      addNot({
                        variant: 'success',
                        title: `You have successfully upgraded to the "${title}" plan!`
                      })
                      updateSubscription(subscribe)

                      hidePayment()

                      trackEvent({
                        category: 'User',
                        action: 'Payment success'
                      })
                    })
                    .catch(e => {
                      addNot({
                        variant: 'error',
                        title: `Error during the payment`,
                        description: formatError(e.message),
                        actions: contactAction
                      })
                      toggleLoading()
                    })
                }
              }}
            >
              <Dialog.ScrollContent className={styles.content}>
                {isTrial && (
                  <FreeTrialLabel
                    price={price}
                    nextPaymentDate={nextPaymentDate}
                  />
                )}

                {!isTrial && (
                  <ProExpiredLabel
                    price={price}
                    nextPaymentDate={nextPaymentDate}
                    period={billing}
                  />
                )}

                <CheckoutForm
                  plan={title}
                  price={price}
                  billing={billing}
                  loading={loading}
                  isFreeTrial={isTrial}
                  changeSelectedPlan={changeSelectedPlan}
                />
              </Dialog.ScrollContent>

              <div className={styles.bottom}>
                <div className={styles.bottom__info}>
                  <IconLock /> Fully secured checkout
                </div>
                <div className={styles.bottom__info}>
                  <IconDollar /> 30 day money back guarantee
                </div>
              </div>
            </Dialog>
          )
        }}
      </Mutation>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message)),
  updateSubscription: payload =>
    dispatch({ type: USER_SUBSCRIPTION_CHANGE, payload })
})

const InjectedForm = connect(
  null,
  mapDispatchToProps
)(injectStripe(PlanPaymentDialog))

export default props => (
  <Elements>
    <InjectedForm {...props} />
  </Elements>
)
