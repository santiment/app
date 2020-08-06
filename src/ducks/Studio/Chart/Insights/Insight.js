import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Loader from '@santiment-network/ui/Loader/Loader'
import Avatar from './Avatar'
import { saveComment } from './utils'
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
  const [loading, setLoading] = useState()
  const { username, avatarUrl } = user

  useEffect(() => {
    let comments
    const timer = setTimeout(() => comments || setLoading(true), 300)

    getInsightComments(id).then(({ data }) => {
      comments = data.comments
      setComments(comments)
      setLoading(false)
    })

    function onKeyDown ({ target, key }) {
      if (target !== document.body) return

      // eslint-disable-next-line
      switch (key) {
        case 'ArrowLeft':
          return isFirst || onPrevClick()
        case 'ArrowRight':
          return isLast || onNextClick()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
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
        saveComment={saveComment}
      />
      {loading && <Loader className={styles.loader} />}
    </>
  )
}

export default React.memo(Insight)
