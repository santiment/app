import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './DialogTitle.module.scss'

const DialogTitle = ({ screen, onClick }) =>
  screen === 0 ? (
    'Subscription cancelling'
  ) : (
    <div className={styles.back} onClick={onClick}>
      <Icon type='arrow-left-big' className={styles.icon} />
      Cancel
    </div>
  )

export default DialogTitle
