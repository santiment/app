import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Modal from '@santiment-network/ui/Modal'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import toReact from 'svelte-adapter/react'
import SvelteComments from 'insights-app/lib/components/comments/Comments'
import { client } from '../../index.js'
import {
  COMMENTS_FOR_INSIGHT_QUERY,
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from '../../queries/comments'
import sharedStyles from './InsightCard.module.scss'
import styles from './Comments.module.scss'

const Comments = toReact(SvelteComments, {}, 'div')

function getComments (id, cursor) {
  return client.query({
    query: COMMENTS_FOR_INSIGHT_QUERY,
    variables: {
      id,
      cursor
    },
    fetchPolicy: 'network-only'
  })
}

function createComment (id, content, parentId) {
  return client.mutate({
    mutation: CREATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content
    }
  })
}

function deleteComment (id) {
  return client.mutate({
    mutation: DELETE_COMMENT_MUTATION,
    variables: {
      id: +id
    }
  })
}

function editComment (id, content) {
  return client.mutate({
    mutation: UPDATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      content
    }
  })
}

export default ({ id, authorId, count }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getComments(id).then(({ data }) => {
      setComments(data.comments)
      setLoading(false)
    })
  }, [])

  return (
    <Modal
      trigger={
        <div className={cx(sharedStyles.stat, sharedStyles.stat_comments)}>
          <Icon type='comment' className={sharedStyles.commentIcon} /> {count}
        </div>
      }
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
          commentsCount={count}
          getComments={getComments}
          createComment={createComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      )}
    </Modal>
  )
}
