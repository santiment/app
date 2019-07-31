import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { formatError, contactAction } from '../../utils/notifications'
import dialogStyles from '../Plans/Dialog.module.scss'
import styles from './CancellationScreen.module.scss'

const CancellationScreen = ({
  closeDialog,
  cancelSubscription,
  addNot,
  id,
  loading,
}) => {
  return (
    <>
      <Dialog.ScrollContent withPadding>
        What happens if you downgrade to Free:
        <ul className={styles.list}>
          <li className={styles.item}>
            You will be able to use all Neuro Free features further.
          </li>
          <li className={styles.item}>
            You will only have access to last 3 months of data
          </li>
          <li className={styles.item}>
            You will not have access to last 24 hours of data
          </li>
          <li className={styles.item}>
            Your will lose access to Advanced metrics
          </li>
        </ul>
      </Dialog.ScrollContent>
      <Dialog.Actions>
        <Dialog.Cancel onClick={closeDialog} className={dialogStyles.cancel}>
          Cancel
        </Dialog.Cancel>
        <Dialog.Approve
          accent='positive'
          isLoading={loading}
          onClick={() =>
            cancelSubscription({
              variables: { subscriptionId: +id },
            })
              .then(() => {
                closeDialog()
                addNot({
                  variant: 'success',
                  title: `You have successfully canceled your subscription.`,
                  description: 'We will miss you!',
                  dismissAfter: 5000,
                })
              })
              .catch(e =>
                addNot({
                  variant: 'error',
                  title: `Error during the cancellation`,
                  description: formatError(e.message),
                  dismissAfter: 5000,
                  actions: contactAction,
                }),
              )
          }
        >
          Confirm cancellation
        </Dialog.Approve>
      </Dialog.Actions>
    </>
  )
}

export default CancellationScreen
