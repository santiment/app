import gql from 'graphql-tag'

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
