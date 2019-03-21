import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@santiment-network/ui'
import moment from 'moment'
import cx from 'classnames'
import InsightTags from './InsightTags'
import ProfileInfo from './ProfileInfo'
import MultilineText from '../MultilineText/MultilineText'
import { getSEOLinkFromIdAndTitle } from '../../pages/Insights/utils'
import LikeBtn from '../Like/LikeBtn'
import styles from './InsightCard.module.scss'

const InsightCardInternals = ({
  id,
  user: { id: authorId, username: authorName },
  title,
  tags,
  createdAt,
  votes: { totalVotes },
  comments,
  votedAt,
  onLike,
  className
}) => {
  return (
    <Fragment>
      <div className={styles.top}>
        <div>
          <InsightTags tags={tags} />
        </div>
        <Link
          to={`/insights/read/${getSEOLinkFromIdAndTitle(id, title)}`}
          className={styles.title}
        >
          <MultilineText maxLines={2} id='insightCardTitle' text={title} />
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <ProfileInfo
            name={
              <Link className={styles.name} to={`/insights/users/${authorId}`}>
                {authorName}
              </Link>
            }
            status={moment(createdAt).fromNow()}
            infoClassName={styles.info}
          />
        </div>
        <div className={styles.right}>
          <LikeBtn
            likesNumber={totalVotes}
            liked={!!votedAt}
            onClick={onLike}
          />
          <div className={cx(styles.stat, styles.stat_comments)}>
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
