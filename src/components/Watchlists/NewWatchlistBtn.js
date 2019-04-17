import React from 'react'
import { Icon, Button, Modal } from '@santiment-network/ui'
import NewWatchlistForm from './NewWatchlistForm'
import styles from './NewWatchlistBtn.module.scss'

const NewWatchlistBtn = () => {
  return (
    <Modal
      showDefaultActions={false}
      className={styles.wrapper}
      title='New watchlist'
      trigger={
        <Button border className={styles.btn}>
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      }
    >
      {({ closeModal }) => <NewWatchlistForm onSuccess={closeModal} />}
    </Modal>
  )
}

export default NewWatchlistBtn
