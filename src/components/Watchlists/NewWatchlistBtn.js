import React from 'react'
import cx from 'classnames'
import { Icon, Button, Modal } from '@santiment-network/ui'
import NewWatchlistForm from './NewWatchlistForm'
import styles from './NewWatchlistBtn.module.scss'

const NewWatchlistBtn = ({ isMobile }) => {
  return (
    <Modal
      showDefaultActions={false}
      title='New watchlist'
      trigger={
        <Button
          border
          className={cx(styles.btn, {
            [styles.mobile]: isMobile
          })}
        >
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      }
    >
      {({ closeModal }) => (
        <NewWatchlistForm isMobile={isMobile} onSuccess={closeModal} />
      )}
    </Modal>
  )
}

export default NewWatchlistBtn
