import React from 'react'
import { Icon, Button, Tooltip } from '@santiment-network/ui'
import NewWatchlistForm from './NewWatchlistForm'
import styles from './NewWatchlistBtn.module.scss'

const NewWatchlistBtn = () => {
  return (
    <Tooltip
      closeTimeout={500}
      position='top'
      on='click'
      trigger={
        <Button border className={styles.btn}>
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      }
    >
      <NewWatchlistForm />
    </Tooltip>
  )
}

export default NewWatchlistBtn
