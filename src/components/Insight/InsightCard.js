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
        <div className={styles.left}>Author</div>
        <div className={styles.right}>
          <div className={styles.stat}>
            <Icon type='eye' /> 54
          </div>
          <div className={styles.stat}>
            <Icon type='eye' /> 54
          </div>
          <Icon type='eye' class={styles.dots} />
        </div>
      </div>
    </Panel>
  )
}

export default InsightCard
