import React, { useState } from 'react'
import GA from 'react-ga'
import { Mutation } from 'react-apollo'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel/Panel'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Elements, injectStripe } from 'react-stripe-elements'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import { CURRENT_USER_QUERY, SUBSCRIBE_MUTATION } from '../../queries/plans'
import { formatError, contactAction } from '../../utils/notifications'
import sharedStyles from './Plans.module.scss'

const addNot = () => {}

function useFormLoading () {
  const [loading, setLoading] = useState(false)
  function toggleLoading () {
    setLoading(state => !state)
  }
  return [loading, toggleLoading]
}

function updateCache (cache, { data: { subscribe } }) {
  const { currentUser } = cache.readQuery({ query: CURRENT_USER_QUERY })

  let subscriptions = currentUser.subscriptions
    ? [subscribe, ...currentUser.subscriptions]
    : [subscribe]

  cache.writeQuery({
    query: CURRENT_USER_QUERY,
    data: { currentUser: { ...currentUser, subscriptions } }
  })
}

const Form = props => <Panel as='form' {...props} />

const getTokenDataByForm = form => {
  const res = {}
  new FormData(form).forEach((value, key) => {
    if (key === 'name') {
      return
    }
    res[key] = value
  })
  return res
}

const PaymentDialog = ({
  title,
  billing,
  label,
  src,
  price,
  planId,
  stripe,
  disabled,
  onDialogClose = () => {}
}) => {
  const [loading, toggleLoading] = useFormLoading()
  const [paymentVisible, setPaymentVisiblity] = useState(false)

  function hidePayment () {
    setPaymentVisiblity(false)
  }

  function showPayment () {
    setPaymentVisiblity(true)
  }

  return (
    <>
      <Button
        className={sharedStyles.link}
        fluid
        border
        accent='positive'
        disabled={disabled}
        onClick={showPayment}
      >
        {label}
      </Button>

      <Mutation mutation={SUBSCRIBE_MUTATION} update={updateCache}>
        {(subscribe, { called, error, data }) => {
          return (
            <Dialog
              title={`Payment for the "${title}" plan (${price}/${billing})`}
              classes={{ dialog: sharedStyles.dialog }}
              open={paymentVisible}
              onClose={hidePayment}
              as={Form}
              modalProps={{
                onSubmit: e => {
                  e.preventDefault()

                  if (loading) return
                  toggleLoading()

                  GA.event({
                    category: 'User',
                    action: 'Payment form submitted'
                  })

                  const form = e.currentTarget
                  const tokenData = getTokenDataByForm(form)

                  stripe
                    .createToken({ name: form.name.value }, tokenData)
                    .then(({ token, error }) => {
                      if (error) {
                        return Promise.reject(error)
                      }

                      return subscribe({
                        variables: { cardToken: token.id, planId }
                      })
                    })
                    .then(() => {
                      addNot({
                        variant: 'success',
                        title: `You have successfully upgraded to the "${title}" plan!`,
                        dismissAfter: 5000
                      })
                      onDialogClose()
                    })
                    .catch(e => {
                      addNot({
                        variant: 'error',
                        title: `Error during the payment`,
                        description: formatError(e.message),
                        dismissAfter: 5000,
                        actions: contactAction
                      })
                      toggleLoading()
                    })
                }
              }}
            >
              {loading && <div>loading</div>}
              <Dialog.ScrollContent withPadding>
                <CheckoutForm plan={title} />
              </Dialog.ScrollContent>
              <Dialog.Actions>
                <Dialog.Cancel
                  className={sharedStyles.action_cancel}
                  onClick={hidePayment}
                >
                  Close
                </Dialog.Cancel>
                <Dialog.Approve
                  variant='fill'
                  accent='blue'
                  disabled={loading}
                  className={sharedStyles.action}
                  type='submit'
                >
                  Confirm payment
                </Dialog.Approve>
              </Dialog.Actions>
            </Dialog>
          )
        }}
      </Mutation>
    </>
  )
}

const InjectedForm = injectStripe(PaymentDialog)

export default props => (
  <Elements>
    <InjectedForm {...props} />
  </Elements>
)
