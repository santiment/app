import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from '../Like/LikeBtn'
import { getSEOLinkFromIdAndTitle } from '../../pages/Insights/utils'
import styles from './InsightCardSmall.module.scss'
import MultilineText from '../MultilineText/MultilineText'

const InsightCard = ({
  className = '',
  id,
  title,
  user,
  votedAt,
  votes: { totalVotes }
}) => {
  return (
    <div className={className}>
      <Link
        to={`/insights/read/${getSEOLinkFromIdAndTitle(id, title)}`}
        className={styles.title}
      >
        <MultilineText id='InsightCardSmall__title' maxLines={2} text={title} />
      </Link>
      <div className={styles.meta}>
        <div className={styles.username} title={user.username}>
          {user.username}
        </div>
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
