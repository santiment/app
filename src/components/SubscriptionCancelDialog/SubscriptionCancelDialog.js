import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Mutation } from 'react-apollo'
import MissYouScreen from './MissYouScreen'
import SolutionsScreen from './SolutionsScreen'
import DialogTitle from './DialogTitle'
import { showNotification } from '../../actions/rootActions'
import { formatPrice } from '../../utils/plans'
import { getDateFormats } from '../../utils/dates'
import { USER_SUBSCRIPTIONS_QUERY, CANCEL_SUBSCRIPTION_MUTATION } from '../../queries/plans'
import { updateUserSubscriptions } from '../../stores/user/subscriptions'

const createCacheUpdate = (subsId) =>
  function updateCache(cache, { data: { cancelSubscription } }) {
    const { currentUser } = cache.readQuery({ query: USER_SUBSCRIPTIONS_QUERY })

    const canceled = currentUser.subscriptions.find(({ id }) => id === subsId)

    canceled.cancelAtPeriodEnd = cancelSubscription.isScheduledForCancellation
    canceled.currentPeriodEnd = cancelSubscription.scheduledForCancellationAt

    currentUser.subscriptions = [...currentUser.subscriptions]
    updateUserSubscriptions(currentUser.subscriptions)

    cache.writeQuery({
      query: USER_SUBSCRIPTIONS_QUERY,
      data: { currentUser: { ...currentUser } },
    })
  }

const SCREENS = [SolutionsScreen, MissYouScreen]

const CancelPlanDialog = ({
  noTrigger = false,
  addNot,
  controlRef,
  subscription: {
    id,
    currentPeriodEnd,
    plan: { amount, name },
  },
}) => {
  const [opened, setOpened] = useState(false)
  const [screen, setScreen] = useState(0)

  const [oldPrice] = formatPrice(amount)
  const { MMMM, DD, YYYY } = getDateFormats(new Date(currentPeriodEnd))
  const date = `${MMMM} ${DD}, ${YYYY}`

  if (controlRef) {
    controlRef.current = { openDialog, closeDialog }
  }

  function closeDialog() {
    setOpened(false)
  }

  function openDialog() {
    setScreen(0)
    setOpened(true)
  }

  function nextScreen() {
    setScreen(screen + 1)
  }

  function previousScreen() {
    setScreen(screen - 1)
  }

  const Screen = SCREENS[screen]

  return (
    <Mutation mutation={CANCEL_SUBSCRIPTION_MUTATION} update={createCacheUpdate(id)}>
      {(cancelSubscription, { loading }) => (
        <Dialog
          open={opened}
          title={<DialogTitle screen={screen} onClick={previousScreen} />}
          onClose={closeDialog}
          trigger={
            noTrigger ? null : (
              <Button onClick={openDialog} accent='positive'>
                Cancel subscription
              </Button>
            )
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

const mapDispatchToProps = (dispatch) => ({
  addNot: (message) => dispatch(showNotification(message)),
})

export default connect(null, mapDispatchToProps)(CancelPlanDialog)
