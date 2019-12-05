import React from 'react'
import styles from './GeneralFeed.module.scss'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'

const GeneralFeed = ({}) => {
  return (
    <div>
      <div className={styles.title}>General feed</div>

      <div className={styles.scrollable}>
        <SonarFeedActivityPage classes={styles} />
      </div>
    </div>
  )
}

export default GeneralFeed
