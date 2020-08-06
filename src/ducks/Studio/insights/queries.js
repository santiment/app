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

export const INSIGHTS_QUERY = gql`
  query allInsights($tags: [String!], $isPulse: Boolean, $isOnlyPro: Boolean) {
    insights: allInsights(
      tags: $tags
      isPulse: $isPulse
      isPaywallRequired: $isOnlyPro
      pageSize: 100
    ) {
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

const allInsightsExtractor = ({ data: { insights } }) => insights

export function getAllInsights () {
  return buildInsightsGetter(INSIGHTS_QUERY, { isOnlyPro: false }).then(
    allInsightsExtractor
  )
}

export function getProInsights () {
  return buildInsightsGetter(INSIGHTS_QUERY, { isOnlyPro: true }).then(
    allInsightsExtractor
  )
}

export function getPulseInsights () {
  return buildInsightsGetter(INSIGHTS_QUERY, { isPulse: true }).then(
    allInsightsExtractor
  )
}

export function getTagInsights (tag) {
  return buildInsightsGetter(INSIGHTS_QUERY, {
    tags: [tag.toUpperCase()]
  }).then(allInsightsExtractor)
}

export function getSANFAMInsights () {
  return buildInsightsGetter(SANFAM_INSIGHTS_QUERY).then(
    ({ data: { insights } }) => insights.slice().sort(publishDateSorter)
  )
}

export function getMyInsights () {
  return buildInsightsGetter(MY_INSIGHTS_QUERY).then(
    ({ data: { currentUser } }) =>
      currentUser ? currentUser.insights.slice().sort(publishDateSorter) : []
  )
}

export function getFollowingsInsights () {
  return buildInsightsGetter(FOLLOWINGS_INSIGHTS_QUERY).then(
    ({ data: { currentUser } }) =>
      currentUser
        ? currentUser.following.users
          .flatMap(({ insights }) => insights)
          .sort(publishDateSorter)
        : []
  )
}

export function getFollowingsCount () {
  return client
    .query({ query: FOLLOWINGS_COUNT_QUERY })
    .then(({ data: { currentUser } }) =>
      currentUser ? currentUser.following.count : 0
    )
}
