import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Icon } from '@santiment-network/ui'
import moment from 'moment'
import MultilineText from '../MultilineText/MultilineText'
import styles from './InsightCard.module.scss'

const InsightCard = ({
  id,
  user: author,
  title,
  tags,
  createdAt,
  votes: { totalVotes },
  comments
}) => {
  return (
    <Panel className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.tags}>
          {tags.map(({ name }) => {
            return (
              <div key={name} className={styles.tag}>
                {name}
              </div>
            )
          })}
        </div>
        <Link
          to={`/insights/${id}`}
          data-mt-id={`insightCardTitle_${id}`}
          className={styles.title}
        >
          <MultilineText
            maxLines={2}
            id={`insightCardTitle_${id}`}
            text={title}
          />
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <div className={styles.profile__icon} />
            <div className={styles.profile__info}>
              <Link
                to={`/insights/users/${author.id}`}
                className={styles.profile__name}
              >
                {author.username}
              </Link>
              <div className={styles.profile__status}>
                {moment(createdAt).fromNow()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.stat}>
            <Icon type='like' /> {totalVotes}
          </div>
          <div className={styles.stat}>
            <Icon type='comment' /> {comments}
          </div>
        </div>
      </div>
    </Panel>
  )
}

InsightCard.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default InsightCard
