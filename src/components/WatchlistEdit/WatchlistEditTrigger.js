import React from 'react'
import { Button, Icon } from '@santiment-network/ui'
import WatchlistEdit from './WatchlistEdit'
import styles from './WatchlistEditButton.module.scss'

const WatchlistEditTrigger = ({ name, ...props }) => {
  return (
    <WatchlistEdit
      {...props}
      name={name}
      trigger={
        <Button border variant='flat'>
          <Icon type='edit' className={styles.icon} />
          <span className={styles.text}>Edit</span>
        </Button>
      }
    />
  )
}

export default WatchlistEditTrigger
