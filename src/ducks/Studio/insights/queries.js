import gql from 'graphql-tag'
import { client } from '../../../index'
import { publishDateSorter } from '../../../components/Insight/utils'

export const INSIGHT_COMMON_FRAGMENT = gql`
  fragment insightCommon on Post {
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
    insights: allInsights(tags: [$ticker], pageSize: 40) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const SANFAM_INSIGHTS_QUERY = gql`
  query allInsights {
    insights: allInsightsForUser(userId: 7) {
      ...insightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const MY_INSIGHTS_QUERY = gql`
  query currentUser {
    currentUser {
      id
      insights {
        ...insightCommon
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
            ...insightCommon
          }
        }
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

const buildInsightsGetter = (query, variables, signal) =>
  client.query({
    query,
    variables,
    context: {
      fetchOptions: {
        signal
      }
    }
  })

export function getInsights (signal, ticker) {
  return buildInsightsGetter(
    PROJECT_INSIGHTS_QUERY,
    { ticker: ticker.toUpperCase() },
    signal
  ).then(({ data: { insights } }) => insights)
}

export function getSANFAMInsights (signal) {
  return buildInsightsGetter(SANFAM_INSIGHTS_QUERY, undefined, signal).then(
    ({ data: { insights } }) => insights.slice().sort(publishDateSorter)
  )
}

export function getMyInsights (signal) {
  return buildInsightsGetter(MY_INSIGHTS_QUERY, undefined, signal).then(
    ({
      data: {
        currentUser: { insights }
      }
    }) => insights.slice().sort(publishDateSorter)
  )
}

export function getFollowingsInsights (signal) {
  return buildInsightsGetter(FOLLOWINGS_INSIGHTS_QUERY, undefined, signal).then(
    ({
      data: {
        currentUser: {
          following: { users }
        }
      }
    }) => users.flatMap(({ insights }) => insights).sort(publishDateSorter)
  )
}
