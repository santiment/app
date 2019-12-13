import gql from 'graphql-tag'
import { INSIGHT_FEED_FRAGMENT } from './InsightsGQL'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'
import {
  WATHCLIST_GENERAL_FRAGMENT,
  PROJECT_ITEM_FRAGMENT
} from './WatchlistGQL'

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
        userList {
          ...generalListData
          ...listShortItems
        }
        post {
          ...insightFeedCommon
        }
        trigger {
          ...triggersCommon
        }
      }
    }
  }
  ${INSIGHT_FEED_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const FEED_QUERY_PREV = gql`
  {
    timelineEvents {
      cursor {
        after
        before
      }
      events {
        eventType
        insertedAt
        user {
          id
        }
        userList {
          ...generalListData
          ...listShortItems
        }
        post {
          ...insightFeedCommon
        }
        trigger {
          ...triggersCommon
        }
      }
    }
  }
  ${INSIGHT_FEED_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`
