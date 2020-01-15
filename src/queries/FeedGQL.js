import gql from 'graphql-tag'
import { INSIGHT_COMMON_FRAGMENT } from './InsightsGQL'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'

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
        trigger {
          ...triggersCommon
        }
        payload
        __typename
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
`
