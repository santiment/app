import React from 'react'
import { CommentsType } from 'webkit/api/comments'
import { CommentsButton } from '../Comments'

const TimelineEventComments = ({ id, authorId, entityType, commentsCount }) => {
  return (
    <CommentsButton
      type={entityType || CommentsType.TimelineEvent}
      commentsFor={{ id, user: { id: authorId } }}
      count={commentsCount}
    />
  )
}

export default TimelineEventComments
