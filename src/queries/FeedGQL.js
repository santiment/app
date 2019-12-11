import gql from 'graphql-tag'
import { INSIGHT_COMMON_FRAGMENT } from './InsightsGQL'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'
import {
  WATHCLIST_GENERAL_FRAGMENT,
  PROJECT_ITEM_FRAGMENT
} from './WatchlistGQL'

export const FEED_QUERY = gql`
  {
    timelineEvents {
      cursor {
        after
        before
      }
      events {
        eventType
        user {
          id
        }
        userList {
          ...generalListData
          ...listShortItems
        }
        post {
          ...insightCommon
        }
        trigger {
          ...triggersCommon
        }
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`
