import React from 'react'
import Button from '@santiment-network/ui/Button'
import styles from './RefreshNotificationActions.module.scss'

const RefreshNotificationActions = ({ onRefresh }) => {
  return (
    <div className={styles.wrapper}>
      Please refresh the browser to have the latest version
      <Button as='a' className={styles.link} onClick={onRefresh} href='#'>
        Refresh now
      </Button>
    </div>
  )
}

export default RefreshNotificationActions
