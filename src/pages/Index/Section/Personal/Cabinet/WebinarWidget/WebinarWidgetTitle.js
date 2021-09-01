import React from 'react'
import { WebinarsImg } from '../images'
import styles from './WebinarWidgetTitle.module.scss'

const WebinarWidgetTitle = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {WebinarsImg}
        <div className={styles.info}>
          <div className={styles.title}>Video Insights</div>
          <div className={styles.description}>
            Check out our recent webinars and weekly streams
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebinarWidgetTitle
