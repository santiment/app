import gql from 'graphql-tag'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'
import { WATCHLIST_GENERAL_FRAGMENT } from './WatchlistGQL'

export const PUBLIC_USER_DATA_QUERY = gql`
  query getUser($userId: ID, $username: String) {
    getUser(selector: { id: $userId, username: $username }) {
      id
      email
      username
      avatarUrl
      watchlists {
        ...generalListData
        historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
          marketcap
        }
      }
      addressesWatchlists: watchlists(type: BLOCKCHAIN_ADDRESS) {
        ...generalListData
        stats {
          blockchainAddressesCount
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
  ${WATCHLIST_GENERAL_FRAGMENT}
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
