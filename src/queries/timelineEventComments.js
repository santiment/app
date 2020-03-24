import gql from 'graphql-tag'

export const COMMENTS_FOR_TIMELINEEVENTS_QUERY = gql`
  query comments(
    $id: ID!
    $cursor: CursorInput
    $entityType: CommentEntityEnum
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

export const CREATE_TIMELINEEVENT_COMMENT_MUTATION = gql`
  mutation createComment(
    $id: Int!
    $content: String!
    $parentId: Int
    $entityType: CommentEntityEnum
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
