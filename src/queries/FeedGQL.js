import gql from 'graphql-tag'
import { INSIGHT_COMMON_FRAGMENT } from './InsightsGQL'

export const FEED_QUERY = gql`
  query timelineEvents($limit: Int, $cursor: CursorInput) {
    timelineEvents: timelineEvents(limit: $limit, cursor: $cursor) {
      cursor {
        after
        before
      }
      events {
        eventType
        insertedAt
        user {
          id
          avatarUrl
        }
        post {
          ...insightCommon
        }
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
`
