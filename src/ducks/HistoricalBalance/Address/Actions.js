import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import CreateAlert from './CreateAlert'
import styles from './index.module.scss'

const Actions = ({ address, assets }) => {
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

      <Button className={styles.btn}>
        <Icon type='copy' className={styles.btn__icon} />
        Add to Watchlist
      </Button>

      <div className={styles.divider} />

      <Button className={styles.btn} onClick={onCommentClick}>
        <Icon type='comment' className={styles.btn__icon} />
        Leave comment
      </Button>
    </div>
  )
}

export default Actions
