import gql from 'graphql-tag'

export const COMMENTS_FOR_INSIGHT_QUERY = gql`
  query insightComments($id: ID!, $cursor: CursorInput) {
    comments: insightComments(insightId: $id, cursor: $cursor, limit: 50) {
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

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: Int!, $content: String!, $parentId: Int) {
    createComment(insightId: $id, content: $content, parentId: $parentId) {
      id
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(commentId: $id) {
      id
    }
  }
`

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($id: Int!, $content: String!) {
    updateComment(commentId: $id, content: $content) {
      id
    }
  }
`
