import gql from 'graphql-tag'
import { insightCommon } from './InsightsGQL'
import { TRIGGERS_COMMON } from '../ducks/Signals/common/queries'
import { generalListData, listShortItems } from './WatchlistGQL'

export const PUBLIC_USER_DATA_QUERY = gql`
  query getUser($userId: ID) {
    getUser(selector: { id: $userId }) {
      id
      email
      username
      watchlists {
        ...generalListData
        ...listShortItems
      }
      followers {
        count
        users {
          id
          email
        }
      }
      insights {
        ...insightCommon
      }
      triggers {
        ...triggersCommon
      }
    }
  }
  ${insightCommon}
  ${TRIGGERS_COMMON}
  ${generalListData}
  ${listShortItems}
`
