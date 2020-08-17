import gql from 'graphql-tag'
import { client } from '../../../apollo'
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
  query allInsights(
    $tags: [String!]
    $isPulse: Boolean
    $isOnlyPro: Boolean
    $from: DateTime
    $to: DateTime
  ) {
    insights: allInsights(
      tags: $tags
      isPulse: $isPulse
      isPaywallRequired: $isOnlyPro
      from: $from
      to: $to
      pageSize: 100
    ) {
      ...studioInsightCommon
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`

export const SANFAM_INSIGHTS_QUERY = gql`
  query allInsightsForUser {
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

export function getAllInsights (from, to) {
  return buildInsightsGetter(INSIGHTS_QUERY, {
    from,
    to,
    isOnlyPro: false
  }).then(allInsightsExtractor)
}

export function getProInsights (from, to) {
  return buildInsightsGetter(INSIGHTS_QUERY, {
    from,
    to,
    isOnlyPro: true
  }).then(allInsightsExtractor)
}

export function getPulseInsights (from, to) {
  return buildInsightsGetter(INSIGHTS_QUERY, { from, to, isPulse: true }).then(
    allInsightsExtractor
  )
}

export function getTagInsights (from, to, tag) {
  return buildInsightsGetter(INSIGHTS_QUERY, {
    from,
    to,
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
