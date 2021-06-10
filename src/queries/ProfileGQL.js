import { useQuery } from '@apollo/react-hooks'
import { useMemo } from 'react'
import gql from 'graphql-tag'
import cloneDeep from 'lodash/cloneDeep'
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
      addressesWatchlists: watchlists(type: BLOCKCHAIN_ADDRESS) {
        ...generalFragment
        stats {
          blockchainAddressesCount
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

export const PUBLIC_USER_FOLLOWERS_DATA_QUERY = gql`
  query getUserFollow($userId: ID, $username: String) {
    followData: getUser(selector: { id: $userId, username: $username }) {
      id
      username
      avatarUrl
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
    }
  }
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

export const useOldUserFollowersFollowing = ({ userId, username }) => {
  const query = useQuery(PUBLIC_USER_FOLLOWERS_DATA_QUERY, {
    skip: !userId && !username,
    variables: {
      userId: +userId,
      username
    }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query

      return {
        data: data ? data.followData : {},
        loading,
        error
      }
    },
    [query]
  )
}

export const updateFollowersList = (followers, follow, unfollow, userId) => {
  const isInList = followers.users.some(({ id }) => +id === +userId)
  const { users } = followers

  if (isInList) {
    const { id: followerId } = follow || unfollow
    followers.users = users.filter(({ id }) => +id !== +followerId)
  } else {
    users.push(follow)
    followers.users = [...users]
  }
  followers.count = followers.users.length

  return followers
}

export const updateFollowingList = (usersList, userData) => {
  const isInList = usersList.users.some(({ id }) => +id === +userData.id)
  const { users } = usersList

  if (isInList) {
    const { id: followerId } = userData
    usersList.users = users.filter(({ id }) => +id !== +followerId)
  } else {
    users.push({
      username: '',
      avatarUrl: '',
      __typename: 'PublicUser',
      ...userData
    })
    usersList.users = [...users]
  }
  usersList.count = usersList.users.length

  return usersList
}

export const updateCurrentUserFollowQueryCache = (
  cache,
  { data: { follow, unfollow } },
  queryVariables,
  userId,
  followingUser,
  currentUserId
) => {
  update({ queryVariables, follow, unfollow, cache, followingUser, userId })

  if (currentUserId) {
    const currentUserQueryVars = {
      userId: +currentUserId
    }

    update({
      queryVariables: currentUserQueryVars,
      cache,
      followingUser: {
        id: queryVariables.userId
      }
    })
  }
}

const update = ({
  queryVariables,
  follow,
  unfollow,
  cache,
  followingUser,
  userId
}) => {
  const data = cloneDeep(
    cache.readQuery({
      query: PUBLIC_USER_FOLLOWERS_DATA_QUERY,
      variables: queryVariables
    })
  )

  const {
    followData: { followers, following }
  } = data

  if (followingUser) {
    updateFollowingList(following, followingUser)
  } else {
    updateFollowersList(followers, follow, unfollow, userId)
  }

  cache.writeQuery({
    query: PUBLIC_USER_FOLLOWERS_DATA_QUERY,
    variables: queryVariables,
    data: {
      ...data
    }
  })
}
