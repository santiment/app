import React from 'react'
import styles from './NoNotitications.module.scss'

const NoNotitications = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rect} />
      <div className={styles.title}>No unread notifications</div>
      <div className={styles.description}>
        Your new messages will appear here
      </div>
    </div>
  )
}

export default NoNotitications
