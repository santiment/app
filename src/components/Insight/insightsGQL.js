import gql from 'graphql-tag'

export const ALL_INSIGHTS_BY_TAG_QUERY = gql`
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

export const ALL_INSIGHTS_QUERY = gql`
  query allInsights {
    allInsights {
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

export const PINNED_INSIGHTS_QUERY = gql`
  query post($id: Int!) {
    pinnedInsight: post(id: $id) {
      id
      title
      createdAt
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
