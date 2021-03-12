import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import CreateAlert from './CreateAlert'
import AddToWatchlist from './AddToWatchlist'
import { useControlledActionsMenu } from '../../../components/ActionsMenu'
import styles from './index.module.scss'

const CreateAlertTrigger = ({ className, assets, address, isWithIcon }) => (
  <CreateAlert
    assets={assets}
    address={address}
    trigger={
      isWithIcon ? (
        <Button className={styles.btn}>
          <Icon type='signal' className={styles.btn__icon} /> Create Alert
        </Button>
      ) : (
        <div className={className}>Create Alert</div>
      )
    }
  />
)

const Actions = ({ address, infrastructure, assets }) => {
  const { ActionsMenu, close } = useControlledActionsMenu()

  function onCommentClick () {
    const $comment = document.querySelector('textarea[name="comment"]')
    if ($comment) {
      $comment.focus()
      close()
    }
  }

  return (
    <div className={styles.actions}>
      <ActionsMenu
        Trigger={props => (
          <CreateAlertTrigger {...props} assets={assets} address={address} />
        )}
      >
        <CreateAlertTrigger assets={assets} address={address} isWithIcon />
        <AddToWatchlist address={address} infrastructure={infrastructure} />
        <Button className={styles.btn} onClick={onCommentClick}>
          <Icon type='comment' className={styles.btn__icon} />
          Comment
        </Button>
      </ActionsMenu>
    </div>
  )
}

export default Actions
