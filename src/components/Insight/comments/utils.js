import { client } from '../../../apollo'
import {
  COMMENTS_TIMELINE_EVENTS_QUERY,
  CREATE_TIMELINE_EVENT_COMMENT_MUTATION
} from '../../../queries/timelineEventComments'
import { CommentTypes } from '../../TimelineEventComments/TimelineEventComments'
import {
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from '../../../queries/insightComments'

export function getInsightComments (id, cursor) {
  return client.query({
    query: COMMENTS_TIMELINE_EVENTS_QUERY,
    variables: {
      id,
      cursor,
      eventType: CommentTypes.INSIGHT
    },
    fetchPolicy: 'network-only'
  })
}

export function createInsightComment (id, content, parentId) {
  return client.mutate({
    mutation: CREATE_TIMELINE_EVENT_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content,
      eventType: CommentTypes.INSIGHT
    }
  })
}

export function deleteComment (id) {
  return client.mutate({
    mutation: DELETE_COMMENT_MUTATION,
    variables: {
      id: +id
    }
  })
}

export function editComment (id, content) {
  return client.mutate({
    mutation: UPDATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      content
    }
  })
}
