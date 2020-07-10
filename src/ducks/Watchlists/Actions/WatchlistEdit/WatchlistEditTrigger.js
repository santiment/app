import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistEdit from './WatchlistEdit'
import styles from '../WatchlistActionButton.module.scss'

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
