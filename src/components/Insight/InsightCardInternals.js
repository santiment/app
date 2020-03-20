import React from 'react'
import cx from 'classnames'
import InsightTags from './InsightTags'
import ProfileInfo, { InsightDate } from './ProfileInfo'
import MultilineText from '../MultilineText/MultilineText'
import LikeBtn from '../Like/LikeBtn'
import { getSEOLinkFromIdAndTitle } from './utils'
import { DesktopOnly, MobileOnly } from '../Responsive'
import { SignalTypeIcon } from '../SignalCard/controls/SignalControls'
import Comments from './Comments'
import styles from './InsightCard.module.scss'

export const makeLinkToInsight = (id, title) => {
  return `https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(
    id,
    title
  )}`
}

const InsightCardInternals = ({
  id,
  state,
  user: { id: authorId, username: authorName, avatarUrl },
  title,
  createdAt,
  publishedAt,
  tags,
  votes: { totalVotes },
  commentsCount,
  votedAt,
  onLike,
  withAuthorPic,
  disabled,
  isDesktop,
  showIcon = false,
  showDate = false,
  children
}) => {
  const linkToInsight = makeLinkToInsight(id, title)

  const date = publishedAt || createdAt

  return (
    <div className={styles.container}>
      {showIcon && (
        <DesktopOnly>
          <SignalTypeIcon type={'social'} />
        </DesktopOnly>
      )}
      <div className={cx(styles.main, showIcon && styles.withIcon)}>
        <div className={styles.description}>
          <div className={styles.top}>
            {showDate && (
              <MobileOnly>
                <InsightDate
                  date={date}
                  state={state}
                  className={styles.date}
                />
              </MobileOnly>
            )}
            <a href={linkToInsight} className={styles.title}>
              <MultilineText maxLines={2} id='insightCardTitle' text={title} />
            </a>
            <div className={styles.profile}>
              <ProfileInfo
                withPic={withAuthorPic}
                picUrl={avatarUrl}
                date={date}
                state={state}
                authorName={authorName}
                authorId={authorId}
                showDate={showDate}
                infoClassName={styles.info}
              />
            </div>
          </div>
          <div className={styles.chart}>{children}</div>
        </div>
        <div className={styles.bottom}>
          <LikeBtn
            likesNumber={totalVotes}
            liked={!!votedAt}
            onClick={onLike}
            disabled={disabled}
            className={styles.likeBtn}
          />
          <Comments id={id} authorId={authorId} count={commentsCount} />
          <div className={styles.tags}>
            <InsightTags tags={tags} isDesktop={isDesktop} />
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
