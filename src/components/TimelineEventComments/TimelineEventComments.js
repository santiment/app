import React from 'react'
import Comments from '../Insight/Comments'
import { client } from '../../index'
import {
  COMMENTS_FOR_TIMELINEEVENTS_QUERY,
  CREATE_TIMELINEEVENT_COMMENT_MUTATION
} from '../../queries/timelineEventComments'

export const CommentTypes = {
  TIMELINE_EVENT: 'TIMELINE_EVENT',
  INSIGHT: 'INSIGHT'
}

function getComments (id, cursor, entityType = CommentTypes.TIMELINE_EVENT) {
  return client.query({
    query: COMMENTS_FOR_TIMELINEEVENTS_QUERY,
    variables: {
      id,
      cursor,
      entityType
    },
    fetchPolicy: 'no-cache'
  })
}

function createComment (
  id,
  content,
  parentId,
  entityType = CommentTypes.TIMELINE_EVENT
) {
  return client.mutate({
    mutation: CREATE_TIMELINEEVENT_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content,
      entityType
    }
  })
}

const TimelineEventComments = ({ id, authorId, commentsCount }) => {
  return (
    <Comments
      id={id}
      authorId={authorId}
      count={commentsCount}
      onGet={getComments}
      onCreate={createComment}
    />
  )
}

export default TimelineEventComments
