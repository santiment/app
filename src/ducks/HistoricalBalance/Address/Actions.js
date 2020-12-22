import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import CreateAlert from './CreateAlert'
import AddToWatchlist from './AddToWatchlist'
import styles from './index.module.scss'

const Actions = ({ address, infrastructure, assets }) => {
  function onCommentClick () {
    const $comment = document.querySelector('textarea[name="comment"]')
    if ($comment) $comment.focus()
  }

  return (
    <div className={styles.actions}>
      <CreateAlert
        assets={assets}
        address={address}
        trigger={
          <Button className={styles.btn}>
            <Icon type='signal' className={styles.btn__icon} />
            Create Alert
          </Button>
        }
      />

      <div className={styles.divider} />

      <AddToWatchlist address={address} infrastructure={infrastructure} />

      <div className={styles.divider} />

      <Button className={styles.btn} onClick={onCommentClick}>
        <Icon type='comment' className={styles.btn__icon} />
        Comment
      </Button>
    </div>
  )
}

export default Actions
