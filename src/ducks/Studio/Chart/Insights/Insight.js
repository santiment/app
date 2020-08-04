import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Avatar from './Avatar'
import { Comments } from '../../../../components/Insight/comments/Comments'
import {
  getInsightComments,
  createInsightComment,
  deleteComment,
  editComment
} from '../../../../components/Insight/comments/utils'
import styles from './Insight.module.scss'

const DEFAULT_COMMENTS = []

const Action = ({ type, isDisabled, ...props }) => (
  <div
    {...props}
    className={cx(
      styles.action,
      styles[type],
      isDisabled && styles.action_disabled
    )}
  >
    <Icon type='arrow-right-big' />
  </div>
)

const Insight = ({
  id,
  title,
  user,
  isFirst,
  isLast,
  onPrevClick,
  onNextClick
}) => {
  const [comments, setComments] = useState(DEFAULT_COMMENTS)
  const [loading, setLoading] = useState(true)
  const { username, avatarUrl } = user

  useEffect(() => {
    getInsightComments(id).then(({ data }) => {
      setComments(data.comments)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.top}>
          <a
            className={styles.title}
            href={`https://insights.santiment.net/read/${id}`}
          >
            {title}
          </a>
          <div className={styles.actions}>
            <Action type='left' onClick={onPrevClick} isDisabled={isFirst} />
            <Action type='right' onClick={onNextClick} isDisabled={isLast} />
          </div>
        </div>
        <a className={styles.user} href={`/profile/${user.id}`}>
          <Avatar className={styles.user__avatar} src={avatarUrl} />
          {username}
        </a>
      </div>
      <Comments
        comments={comments}
        id={id}
        authorId={user.id}
        commentsCount={comments.length}
        getComments={getInsightComments}
        createComment={createInsightComment}
        editComment={editComment}
        deleteComment={deleteComment}
      />
      {loading && 'Loading...'}
    </>
  )
}

export default React.memo(Insight)
