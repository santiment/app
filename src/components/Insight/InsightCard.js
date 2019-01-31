import React from 'react'
import { Panel, Icon } from '@santiment-network/ui'
import styles from './InsightCard.module.scss'

const InsightCard = () => {
  return (
    <Panel className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.tags}>
          <div className={styles.tag}>bitcoin</div>
          <div className={styles.tag}>bitcoin</div>
          <div className={styles.tag}>bitcoin</div>
          <div className={styles.tag}>bitcoin</div>
        </div>
        <div className={styles.title}>title</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <div className={styles.profile__icon} />
            <div className={styles.profile__info}>
              <div className={styles.profile__name}>Author</div>
              <div className={styles.profile__status}>2 hours ago</div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.stat}>
            <Icon type='eye' /> 54
          </div>
          <div className={styles.stat}>
            <Icon type='eye' /> 54
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default InsightCard
