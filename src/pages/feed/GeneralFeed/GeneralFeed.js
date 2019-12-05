import React from 'react'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'

const GeneralFeed = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>General feed</div>

      <div className={styles.scrollable}>
        <SonarFeedActivityPage classes={styles} />
      </div>
    </div>
  )
}

export default GeneralFeed
