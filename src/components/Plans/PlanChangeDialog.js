import React from 'react'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Mutation } from 'react-apollo'
import PLANS from './list'
import { UPDATE_SUBSCRIPTION_MUTATION } from '../../queries/plans'
import { formatPrice } from '../../utils/plans'
import { getDateFormats } from '../../utils/dates'
import { formatError, contactAction } from '../../utils/notifications'
import planStyles from './Plan.module.scss'
import dialogStyles from './Dialog.module.scss'

const addNot = () => {}

const ChangePlanDialog = ({
  subscription: {
    id,
    currentPeriodEnd,
    plan: { amount, name, interval }
  },
  title,
  price,
  billing,
  planId,
  onDialogClose = () => {}
}) => {
  const [oldPrice] = formatPrice(amount, null, interval)
  const { MMMM, DD, YYYY } = getDateFormats(new Date(currentPeriodEnd))
  const date = `${MMMM} ${DD}, ${YYYY}`

  return (
    <Mutation mutation={UPDATE_SUBSCRIPTION_MUTATION}>
      {(updateSubscription, { loading }) => (
        <Dialog
          trigger={
            <Button fluid className={planStyles.link} border accent='blue'>
              Change to this plan
            </Button>
          }
          title='Plan change'
        >
          <Dialog.ScrollContent withPadding>
            Your current plan ({PLANS[name].title} {oldPrice}/month) is active
            until {date}.
            <br />
            Are you sure you want to change to the {title} plan ({price}
            /month) on {date}?
          </Dialog.ScrollContent>
          <Dialog.Actions>
            <Dialog.Cancel className={dialogStyles.cancel}>
              Cancel
            </Dialog.Cancel>
            <Dialog.Approve
              accent='blue'
              isLoading={loading}
              onClick={() =>
                updateSubscription({
                  variables: { subscriptionId: +id, planId: +planId }
                })
                  .then(() =>
                    addNot({
                      variant: 'success',
                      title: `You have successfully upgraded to the "${title}" plan!`,
                      dismissAfter: 5000
                    })
                  )
                  .then(onDialogClose)
                  .catch(e =>
                    addNot({
                      variant: 'error',
                      title: `Error during the plan change`,
                      description: formatError(e.message),
                      dismissAfter: 5000,
                      actions: contactAction
                    })
                  )
              }
            >
              Confirm change
            </Dialog.Approve>
          </Dialog.Actions>
        </Dialog>
      )}
    </Mutation>
  )
}

export default ChangePlanDialog
