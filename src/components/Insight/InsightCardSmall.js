import React from 'react'
import LikeBtn from '../Like/LikeBtn'
import MultilineText from '../MultilineText/MultilineText'
import { getSEOLinkFromIdAndTitle } from '../../pages/Insights/utils'
import styles from './InsightCardSmall.module.scss'

const InsightCard = ({
  className = '',
  id,
  title,
  user,
  votedAt,
  votes: { totalVotes },
  maxLines = 2,
  multilineTextId
}) => {
  return (
    <div className={className}>
      <a
        href={`https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(
          id,
          title
        )}`}
        className={styles.title}
      >
        <MultilineText id={multilineTextId} maxLines={maxLines} text={title} />
      </a>
      <div className={styles.meta}>
        <a
          href={`https://insights.santiment.net/user/${user.id}`}
          className={styles.username}
        >
          {user.username}
        </a>
        <LikeBtn disabled liked={!!votedAt} likesNumber={totalVotes} />
      </div>
    </div>
  )
}

InsightCard.defaultProps = {
  votes: {},
  comments: 0
}

export default InsightCard
