import gql from 'graphql-tag'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'
import { SHORT_WATCHLIST_FRAGMENT } from '../ducks/Watchlists/gql/fragments'

export const PUBLIC_USER_DATA_QUERY = gql`
  query getUser($userId: ID, $username: String) {
    getUser(selector: { id: $userId, username: $username }) {
      id
      email
      username
      avatarUrl
      watchlists {
        ...generalFragment
        historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
          marketcap
        }
      }
      followers {
        count
        users {
          id
          avatarUrl
          username
        }
      }
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
      triggers {
        ...triggersCommon
      }
      insightsCount {
        totalCount
      }
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
  ${SHORT_WATCHLIST_FRAGMENT}
`

export const FOLLOW_MUTATION = gql(`
  mutation follow($id: ID!)
  {
    follow(userId: $id) {
        id
        username
        avatarUrl
    }
  }
`)

export const UNFOLLOW_MUTATION = gql(`
  mutation unfollow($id: ID!) {
    unfollow(userId: $id) {
        id
        username
        avatarUrl
    }
  }
`)
