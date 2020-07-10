import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Mutation } from 'react-apollo'
import CancellationScreen from './CancellationScreen'
import MissYouScreen from './MissYouScreen'
import { showNotification } from '../../actions/rootActions'
import { formatPrice } from '../../utils/plans'
import { getDateFormats } from '../../utils/dates'
import {
  USER_SUBSCRIPTIONS_QUERY,
  CANCEL_SUBSCRIPTION_MUTATION
} from '../../queries/plans'
import { updateUserSubscriptions } from '../../contexts/user/subscriptions'

const createCacheUpdate = subsId =>
  function updateCache (cache, { data: { cancelSubscription } }) {
    const { currentUser } = cache.readQuery({ query: USER_SUBSCRIPTIONS_QUERY })

    const canceled = currentUser.subscriptions.find(({ id }) => id === subsId)

    canceled.cancelAtPeriodEnd = cancelSubscription.isScheduledForCancellation
    canceled.currentPeriodEnd = cancelSubscription.scheduledForCancellationAt

    currentUser.subscriptions = [...currentUser.subscriptions]
    updateUserSubscriptions(currentUser.subscriptions)

    cache.writeQuery({
      query: USER_SUBSCRIPTIONS_QUERY,
      data: { currentUser: { ...currentUser } }
    })
  }

const SCREENS = [MissYouScreen, CancellationScreen]

const CancelPlanDialog = ({
  addNot,
  subscription: {
    id,
    currentPeriodEnd,
    plan: { amount, name, interval }
  }
}) => {
  const [opened, setOpened] = useState(false)
  const [screen, setScreen] = useState(0)

  const [oldPrice] = formatPrice(amount)
  const { MMMM, DD, YYYY } = getDateFormats(new Date(currentPeriodEnd))
  const date = `${MMMM} ${DD}, ${YYYY}`

  function closeDialog () {
    setOpened(false)
    setScreen(0)
  }

  function openDialog () {
    setOpened(true)
  }

  function nextScreen () {
    setScreen(screen + 1)
  }

  const Screen = SCREENS[screen]

  return (
    <Mutation
      mutation={CANCEL_SUBSCRIPTION_MUTATION}
      update={createCacheUpdate(id)}
    >
      {(cancelSubscription, { loading }) => (
        <Dialog
          open={opened}
          title='Subscription cancelling'
          onClose={closeDialog}
          trigger={
            <Button onClick={openDialog} accent='positive'>
              Cancel subscription
            </Button>
          }
        >
          <Screen
            id={id}
            cancelSubscription={cancelSubscription}
            closeDialog={closeDialog}
            nextScreen={nextScreen}
            date={date}
            oldPrice={oldPrice}
            name={name}
            loading={loading}
            addNot={addNot}
          />
        </Dialog>
      )}
    </Mutation>
  )
}

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message))
})

export default connect(
  null,
  mapDispatchToProps
)(CancelPlanDialog)
