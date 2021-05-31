import React from 'react'
import { NoNotificationsSvg } from './utils'
import styles from './NoNotitications.module.scss'

const NoNotitications = ({ description, showSvg }) => {
  return (
    <div className={styles.container}>
      {showSvg && (
        <>
          <div className={styles.rect}>{NoNotificationsSvg}</div>
          <div className={styles.title}>No unread notifications</div>
        </>
      )}
      <div className={styles.description}>{description}</div>
    </div>
  )
}

export default NoNotitications
