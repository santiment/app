import React, { useState, useEffect } from 'react'
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

const Insight = ({ id, title, user }) => {
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
    </>
  )
}

export default Insight
