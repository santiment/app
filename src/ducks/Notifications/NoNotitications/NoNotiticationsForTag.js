import React from 'react'
import styles from './NoNotitications.module.scss'

const NoNotiticationsForTag = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        There’s no activity for this tag, please select another one
      </div>
    </div>
  )
}

export default NoNotiticationsForTag
