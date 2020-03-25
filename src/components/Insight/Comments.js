import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Modal from '@santiment-network/ui/Modal'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import toReact from 'svelte-adapter/react'
import SvelteComments from 'insights-app/lib/components/comments/Comments'
import { client } from '../../index.js'
import {
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from '../../queries/insightComments'
import sharedStyles from './InsightCard.module.scss'
import styles from './Comments.module.scss'
import {
  COMMENTS_FOR_TIMELINEEVENTS_QUERY,
  CREATE_TIMELINEEVENT_COMMENT_MUTATION
} from '../../queries/timelineEventComments'
import { CommentTypes } from '../TimelineEventComments/TimelineEventComments'

const Comments = toReact(SvelteComments, {}, 'div')

function getComments (id, cursor) {
  return client.query({
    query: COMMENTS_FOR_TIMELINEEVENTS_QUERY,
    variables: {
      id,
      cursor,
      eventType: CommentTypes.INSIGHT
    },
    fetchPolicy: 'network-only'
  })
}

function createComment (id, content, parentId) {
  return client.mutate({
    mutation: CREATE_TIMELINEEVENT_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content,
      eventType: CommentTypes.INSIGHT
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

export default ({
  id,
  authorId,
  count,
  onEdit = editComment,
  onDelete = deleteComment,
  onCreate = createComment,
  onGet = getComments
}) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCommentsCount = () => {
    onGet(id).then(({ data }) => {
      setComments(data.comments)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadCommentsCount()
  }, [])

  const onClose = () => {
    loadCommentsCount()
  }

  let showingCount = comments.length || count

  return (
    <Modal
      trigger={
        <div className={cx(sharedStyles.stat, sharedStyles.stat_comments)}>
          <Icon type='comment' className={sharedStyles.commentIcon} />{' '}
          {showingCount}
        </div>
      }
      onClose={onClose}
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
          commentsCount={showingCount}
          getComments={onGet}
          createComment={onCreate}
          editComment={onEdit}
          deleteComment={onDelete}
        />
      )}
    </Modal>
  )
}
