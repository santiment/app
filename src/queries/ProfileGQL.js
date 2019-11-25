import gql from 'graphql-tag'
import { INSIGHT_COMMON_FRAGMENT } from './InsightsGQL'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'
import { generalListData, listShortItems } from './WatchlistGQL'

export const PUBLIC_USER_DATA_QUERY = gql`
  query getUser($userId: ID, $username: String) {
    getUser(selector: { id: $userId, username: $username }) {
      id
      email
      username
      avatarUrl
      watchlists {
        ...generalListData
        ...listShortItems
      }
      followers {
        count
        users {
          id
        }
      }
      following {
        count
      }
      insights {
        ...insightCommon
      }
      triggers {
        ...triggersCommon
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
  ${generalListData}
  ${listShortItems}
`

export const FOLLOW_MUTATION = gql(`
  mutation follow($id: ID!) 
  {  
    follow(userId: $id) {
        id
    }
  }
`)

export const UNFOLLOW_MUTATION = gql(`
  mutation unfollow($id: ID!) {
    unfollow(userId: $id) {
        id
    }
  }
`)
