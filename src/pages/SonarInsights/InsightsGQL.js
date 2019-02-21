import gql from 'graphql-tag'

export const ALL_INSIGHTS_QUERY = gql`
  query allInsights {
    insights: allInsights {
      readyState
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

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight: post(id: $id) {
      id
      title
      createdAt
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
      state
      readyState
      votedAt
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
      state
      readyState
      votedAt
      votes {
        totalSanVotes
        totalVotes
      }
    }
  }
`
