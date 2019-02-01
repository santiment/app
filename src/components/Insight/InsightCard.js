import React from 'react'
import { Panel, Icon } from '@santiment-network/ui'
import moment from 'moment'
import styles from './InsightCard.module.scss'

const InsightCard = ({ id, author, title, tags, createdAt, votes = 0 }) => {
  return (
    <Panel className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.tags}>
          {tags.map(tag => {
            return (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            )
          })}
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <div className={styles.profile__icon} />
            <div className={styles.profile__info}>
              <div className={styles.profile__name}>{author}</div>
              <div className={styles.profile__status}>
                {moment(createdAt).fromNow()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.stat}>
            <Icon type='eye' /> {votes}
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
