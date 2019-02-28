import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@santiment-network/ui'
import moment from 'moment'
import InsightTags from './InsightTags'
import ProfileInfo from './ProfileInfo'
import MultilineText from '../MultilineText/MultilineText'
import styles from './InsightCard.module.scss'

const InsightCardInternals = ({
  id,
  user: { id: authorId, username: authorName },
  title,
  tags,
  createdAt,
  votes: { totalVotes },
  comments,
  className
}) => {
  return (
    <Fragment>
      <div className={styles.top}>
        <div>
          <InsightTags tags={tags} />
        </div>
        <Link to={`/insights-sonar/${id}`} className={styles.title}>
          <MultilineText maxLines={2} id='insightCardTitle' text={title} />
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <ProfileInfo
            name={
              <Link to={`/insights-sonar/users/${authorId}`}>{authorName}</Link>
            }
            status={moment(createdAt).fromNow()}
          />
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
    </Fragment>
  )
}

InsightCardInternals.defaultProps = {
  votes: {},
  tags: [],
  comments: 0
}

export default InsightCardInternals
