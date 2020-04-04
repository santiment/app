import gql from 'graphql-tag'

export const INSIGHT_COMMON_FRAGMENT = gql`
  fragment insightCommon on Post {
    id
    readyState
    title
    createdAt
    publishedAt
    updatedAt
    tags {
      name
    }
    votedAt
    votes {
      totalVotes
    }
    user {
      id
      username
      avatarUrl
    }
    shortDesc
    commentsCount
    isPaywallRequired
    __typename
  }
`

export const FEATURED_INSIGHTS_QUERY = gql`
  query featuredInsights {
    insights: featuredInsights {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const ALL_INSIGHTS_BY_TAG_QUERY = gql`
  query allInsightsByTag($tag: String!) {
    allInsightsByTag(tag: $tag) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const ALL_INSIGHTS_QUERY = gql`
  query allInsights {
    allInsights {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const PINNED_INSIGHTS_QUERY = gql`
  query post($id: Int!) {
    pinnedInsight: post(id: $id) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const ALL_TAGS_QUERY = gql`
  query allTags {
    tags: allTags {
      name
    }
  }
`

export const ALL_INSIGHTS_BY_PAGE_QUERY = gql`
  query allInsights($page: Int, $pageSize: Int = 10) {
    insights: allInsights(page: $page, pageSize: $pageSize) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const CURRENT_USER_INSIGHTS_QUERY = gql`
  query currentUser {
    currentUser {
      id
      insights {
        state
        ...insightCommon
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const CURRENT_USER_DRAFT_INSIGHTS = gql`
  query currentUser {
    currentUser {
      id
      insights {
        readyState
        id
        title
        text
        updatedAt
        user {
          username
          id
        }
      }
    }
  }
`

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight: post(id: $id) {
      text
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const INSIGHTS_BY_USERID_QUERY = gql`
  query allInsightsForUser($userId: Int!) {
    insights: allInsightsForUser(userId: $userId) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const INSIGHTS_BY_TAG_QUERY = gql`
  query allInsightsByTag($tag: String!) {
    insights: allInsightsByTag(tag: $tag) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
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

export const PUBLISH_INSIGHT_DRAFT_MUTATION = gql`
  mutation publishInsight($id: ID!) {
    publishInsight(id: $id) {
      id
    }
  }
`
