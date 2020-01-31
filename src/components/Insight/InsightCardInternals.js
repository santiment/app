import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Icon } from '@santiment-network/ui'
import InsightTags from './InsightTags'
import ProfileInfo from './ProfileInfo'
import MultilineText from '../MultilineText/MultilineText'
import LikeBtn from '../Like/LikeBtn'
import { getDateFormats } from '../../utils/dates'
import { getSEOLinkFromIdAndTitle } from './utils'
import styles from './InsightCard.module.scss'
import { DesktopOnly } from '../Responsive'
import { SignalTypeIcon } from '../SignalCard/controls/SignalControls'

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
  commentsCount,
  votedAt,
  onLike,
  withAuthorPic,
  disabled,
  isDesktop,
  showIcon = false
}) => {
  const { DD, MMM, YYYY } = getDateFormats(new Date(publishedAt || createdAt))
  const linkToInsight = `https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(
    id,
    title
  )}`

  return (
    <div className={styles.container}>
      {showIcon && (
        <DesktopOnly>
          <SignalTypeIcon type={'social'} />
        </DesktopOnly>
      )}
      <div className={cx(styles.main, showIcon && styles.withIcon)}>
        <div className={styles.top}>
          <a href={linkToInsight} className={styles.title}>
            <MultilineText maxLines={2} id='insightCardTitle' text={title} />
          </a>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profile}>
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
              className={styles.likeBtn}
            />
            <a
              href={linkToInsight + '?_wc=1#comments'}
              className={cx(styles.stat, styles.stat_comments)}
            >
              <Icon type='comment' className={styles.commentIcon} />{' '}
              {commentsCount}
            </a>
            <div className={styles.tags}>
              <InsightTags tags={tags} isDesktop={isDesktop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

InsightCardInternals.defaultProps = {
  votes: {},
  tags: [],
  commentsCount: 0,
  withAuthorPic: true
}

export default InsightCardInternals
