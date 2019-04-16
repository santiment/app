import React from 'react'
import { Link } from 'react-router-dom'
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
  maxLines,
  multilineTextId
}) => {
  return (
    <div className={className}>
      <Link
        to={`/insights/read/${getSEOLinkFromIdAndTitle(id, title)}`}
        className={styles.title}
      >
        <MultilineText
          id={multilineTextId}
          maxLines={maxLines || 2}
          text={title}
        />
      </Link>
      <div className={styles.meta}>
        <Link to={`/insights/users/${user.id}`} className={styles.username}>
          {user.username}
        </Link>
        <LikeBtn small grey liked={!!votedAt} likesNumber={totalVotes} />
      </div>
    </div>
  )
}

InsightCard.defaultProps = {
  votes: {},
  comments: 0
}

export default InsightCard
