import { client } from '../../../apollo'
import {
  COMMENTS_TIMELINE_EVENTS_QUERY,
  CREATE_TIMELINE_EVENT_COMMENT_MUTATION
} from '../../../queries/timelineEventComments'
import {
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from '../../../queries/insightComments'

export const buildCommentsGetter = entityType => (id, cursor) =>
  client.query({
    query: COMMENTS_TIMELINE_EVENTS_QUERY,
    variables: {
      id,
      cursor,
      entityType
    },
    fetchPolicy: 'network-only'
  })

export const buildCommentCreator = entityType => (id, content, parentId) =>
  client.mutate({
    mutation: CREATE_TIMELINE_EVENT_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content,
      entityType
    }
  })

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

export const getInsightComments = buildCommentsGetter()
export const createInsightComment = buildCommentCreator()
