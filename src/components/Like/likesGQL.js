import gql from 'graphql-tag'

export const UNLIKE_INSIGHT_MUTATION = gql`
  mutation unvote($id: Int!) {
    unvote(postId: $id) {
      votedAt
    }
  }
`

export const LIKE_INSIGHT_MUTATION = gql`
  mutation vote($id: Int!) {
    vote(postId: $id) {
      votedAt
    }
  }
`
