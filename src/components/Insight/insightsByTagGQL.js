import gql from 'graphql-tag'

export const allInsightsByTagGQL = gql`
  query allInsightsByTag($tag: String!) {
    allInsightsByTag(tag: $tag) {
      id
      title
      createdAt
      votes {
        totalSanVotes
        totalVotes
      }
      tags {
        name
      }
      user {
        id
        username
      }
    }
  }
`
