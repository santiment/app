import gql from 'graphql-tag'

export const COMMENTS_TIMELINE_EVENTS_QUERY = gql`
  query comments(
    $id: ID!
    $cursor: CursorInput
    $entityType: CommentEntityTypeEnum
  ) {
    comments(id: $id, cursor: $cursor, entityType: $entityType, limit: 50) {
      id
      content
      parentId
      insertedAt
      editedAt
      user {
        id
        username
        email
        avatarUrl
      }
    }
  }
`

export const CREATE_TIMELINE_EVENT_COMMENT_MUTATION = gql`
  mutation createComment(
    $id: Int!
    $content: String!
    $parentId: Int
    $entityType: CommentEntityTypeEnum
  ) {
    createComment(
      id: $id
      content: $content
      parentId: $parentId
      entityType: $entityType
    ) {
      id
    }
  }
`
