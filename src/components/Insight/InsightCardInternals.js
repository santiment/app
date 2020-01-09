import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Icon } from '@santiment-network/ui'
import InsightTags from './InsightTags'
import ProfileInfo from './ProfileInfo'
import MultilineText from '../MultilineText/MultilineText'
import { getSEOLinkFromIdAndTitle } from '../../pages/Insights/utils'
import LikeBtn from '../Like/LikeBtn'
import { getDateFormats } from '../../utils/dates'
import styles from './InsightCard.module.scss'

const AWAITING_APPROVAL_STATE = 'awaiting_approval'
const AwaitingApproval = () => (
  <div className={styles.awaiting}>
    <Icon type='awaiting' className={styles.awaiting__icon} /> Awaiting approval
  </div>
)

const InsightCardInternals = ({
  id,
  user: { id: authorId, username: authorName, avatarUrl },
  title,
  tags,
  createdAt,
  publishedAt,
  state,
  votes: { totalVotes },
  comments,
  votedAt,
  onLike,
  withAuthorPic,
  disabled,
  className,
  isDesktop
}) => {
  const { DD, MMM, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
  return (
    <Fragment>
      <div className={styles.top}>
        <div>
          <InsightTags tags={tags} isDesktop={isDesktop} />
        </div>
        <a
          href={`https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(
            id,
            title
          )}`}
          className={styles.title}
        >
          <MultilineText maxLines={2} id='insightCardTitle' text={title} />
        </a>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <ProfileInfo
            withPic={withAuthorPic}
            picUrl={avatarUrl}
            name={
              <Link className={styles.name} to={`/profile/${authorId}`}>
                {authorName}
              </Link>
            }
            status={
              state === AWAITING_APPROVAL_STATE ? (
                <AwaitingApproval />
              ) : (
                `${MMM} ${DD}, ${YYYY}`
              )
            }
            infoClassName={styles.info}
          />
        </div>
        <div className={styles.right}>
          <LikeBtn
            likesNumber={totalVotes}
            liked={!!votedAt}
            onClick={onLike}
            disabled={disabled}
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
  comments: 0,
  withAuthorPic: true
}

export default InsightCardInternals
