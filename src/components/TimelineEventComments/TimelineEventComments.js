import React from 'react'
import { CommentTypes } from './types'
import Comments from '../Insight/comments/Comments'
import { client } from '../../apollo'
import {
  COMMENTS_TIMELINE_EVENTS_QUERY,
  CREATE_TIMELINE_EVENT_COMMENT_MUTATION
} from '../../queries/timelineEventComments'

function getTimelineComments (
  id,
  cursor,
  entityType = CommentTypes.TIMELINE_EVENT
) {
  return client.query({
    query: COMMENTS_TIMELINE_EVENTS_QUERY,
    variables: {
      id,
      cursor,
      entityType
    },
    fetchPolicy: 'network-only'
  })
}

function createTimelineComment (
  id,
  content,
  parentId,
  entityType = CommentTypes.TIMELINE_EVENT
) {
  return client.mutate({
    mutation: CREATE_TIMELINE_EVENT_COMMENT_MUTATION,
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
      getComments={getTimelineComments}
      createComment={createTimelineComment}
    />
  )
}

export default TimelineEventComments
