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

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight(id: $id) {
      text
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`
