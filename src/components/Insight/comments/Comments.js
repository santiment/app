import React, { useState } from 'react'
import cx from 'classnames'
import Modal from '@santiment-network/ui/Modal'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import toReact from 'svelte-adapter/react'
import SvelteComments from 'insights-app/lib/components/comments/Comments'
import sharedStyles from '../InsightCard.module.scss'
import styles from './Comments.module.scss'
import { deleteComment, editComment } from './utils'

const Comments = toReact(SvelteComments, {}, 'div')

export default ({ id, authorId, count, createComment, getComments }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const commentsCount = comments.length || count

  const loadComments = () => {
    getComments(id).then(({ data }) => {
      setComments(data.comments)
      setLoading(false)
    })
  }

  return (
    <Modal
      trigger={
        <div className={cx(sharedStyles.stat, sharedStyles.stat_comments)}>
          <Icon type='comment' className={sharedStyles.commentIcon} />{' '}
          {commentsCount}
        </div>
      }
      onClose={loadComments}
      onOpen={loadComments}
      as={Panel}
      classes={{
        wrapper: styles.wrapper,
        modal: cx(styles.modal, loading && 'loading')
      }}
    >
      {loading ? null : (
        <Comments
          comments={comments}
          id={id}
          authorId={authorId}
          commentsCount={commentsCount}
          getComments={getComments}
          createComment={createComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      )}
    </Modal>
  )
}
