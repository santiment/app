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
  ${insightCommon}
  ${TRIGGERS_COMMON}
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
