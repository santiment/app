import gql from 'graphql-tag'

export const ALL_INSIGHTS_QUERY = gql`
  query allInsights {
    insights: allInsights {
      readyState
      id
      title
      createdAt
      updatedAt
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

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight: post(id: $id) {
      id
      title
      text
      createdAt
      updatedAt
      state
      readyState
      tags {
        name
      }
      user {
        username
        id
      }
      votedAt
      votes {
        totalSanVotes
        totalVotes
      }
    }
  }
`

export const INSIGHTS_USER_DRAFTS_QUERY = gql`
  query allInsightsForUser($userId: Int!) {
    insights: allInsightsForUser(userId: $userId) {
      id
      title
      text
      readyState
      updatedAt
      tags {
        name
      }
      user {
        username
        id
      }
    }
  }
`

export const INSIGHTS_BY_USERID_QUERY = gql`
  query allInsightsForUser($userId: Int!) {
    insights: allInsightsForUser(userId: $userId) {
      id
      title
      user {
        id
        username
      }
      createdAt
      updatedAt
      state
      readyState
      votedAt
      tags {
        name
      }
      votes {
        totalSanVotes
        totalVotes
      }
    }
  }
`

export const INSIGHTS_BY_TAG_QUERY = gql`
  query allInsightsByTag($tag: String!) {
    insights: allInsightsByTag(tag: $tag) {
      id
      title
      user {
        id
        username
      }
      createdAt
      updatedAt
      state
      readyState
      votedAt
      tags {
        name
      }
      votes {
        totalSanVotes
        totalVotes
      }
    }
  }
`

export const DELETE_INSIGHT_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export const CREATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation createPost($title: String!, $text: String, $tags: [String]) {
    updatedDraft: createPost(title: $title, text: $text, tags: $tags) {
      id
      updatedAt
    }
  }
`

export const UPDATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $text: String
    $tags: [String]
  ) {
    updatedDraft: updatePost(id: $id, title: $title, text: $text, tags: $tags) {
      id
      updatedAt
    }
  }
`
