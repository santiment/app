import gql from 'graphql-tag'
import { client } from '../../../index'
import { publishDateSorter } from '../../../components/Insight/utils'

export const INSIGHT_COMMON_FRAGMENT = gql`
  fragment studioInsightCommon on Post {
    id
    title
    publishedAt
    user {
      id
      username
      avatarUrl
    }
  }
`

export const PROJECT_INSIGHTS_QUERY = gql`
  query allInsights($ticker: String!) {
    insights: allInsights(tags: [$ticker], pageSize: 50) {
      ...studioInsightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const SANFAM_INSIGHTS_QUERY = gql`
  query allInsights {
    insights: allInsightsForUser(userId: 7) {
      ...studioInsightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const MY_INSIGHTS_QUERY = gql`
  query currentUser {
    currentUser {
      id
      insights {
        ...studioInsightCommon
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const FOLLOWINGS_INSIGHTS_QUERY = gql`
  query currentUser {
    currentUser {
      id
      following {
        users {
          id
          insights {
            ...studioInsightCommon
          }
        }
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const FOLLOWINGS_COUNT_QUERY = gql`
  query currentUser {
    currentUser {
      id
      following {
        count
      }
    }
  }
`

const buildInsightsGetter = (query, variables) =>
  client.query({
    query,
    variables
  })

export function getInsights (ticker) {
  return buildInsightsGetter(PROJECT_INSIGHTS_QUERY, {
    ticker: ticker.toUpperCase()
  }).then(({ data: { insights } }) => insights)
}

export function getSANFAMInsights () {
  return buildInsightsGetter(SANFAM_INSIGHTS_QUERY).then(
    ({ data: { insights } }) => insights.slice().sort(publishDateSorter)
  )
}

export function getMyInsights () {
  return buildInsightsGetter(MY_INSIGHTS_QUERY).then(
    ({
      data: {
        currentUser: { insights }
      }
    }) => insights.slice().sort(publishDateSorter)
  )
}

export function getFollowingsInsights () {
  return buildInsightsGetter(FOLLOWINGS_INSIGHTS_QUERY).then(
    ({
      data: {
        currentUser: {
          following: { users }
        }
      }
    }) => users.flatMap(({ insights }) => insights).sort(publishDateSorter)
  )
}

export function getFlowingsCount () {
  return client
    .query({ query: FOLLOWINGS_COUNT_QUERY })
    .then(({ data: { currentUser } }) =>
      currentUser ? currentUser.following.count : 0
    )
}
