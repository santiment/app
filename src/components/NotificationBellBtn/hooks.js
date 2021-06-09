import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const NOTIFICATIONS_FOLLOWERS_QUERY = gql`
  {
    currentUser {
      id
      following2 {
        users {
          userId
          isNotificationDisabled
        }
      }
    }
  }
`

export const useFollowers = () => {
  const query = useQuery(NOTIFICATIONS_FOLLOWERS_QUERY)

  return useMemo(
    () => {
      const { data, loading, error } = query

      return {
        data: data && data.currentUser ? data.currentUser : undefined,
        loading,
        error
      }
    },
    [query]
  )
}

export const NOTIFICATIONS_ENABLE_MUTATION = gql`
  mutation followingToggleNotification(
    $userId: ID!
    $disableNotifications: Boolean
  ) {
    followingToggleNotification(
      userId: $userId
      disableNotifications: $disableNotifications
    ) {
      following2 {
        users {
          userId
          isNotificationDisabled
        }
      }
    }
  }
`

function buildCacheUpdater (reducer) {
  return (cache, { data }) => {
    const { currentUser } = cache.readQuery({
      query: NOTIFICATIONS_FOLLOWERS_QUERY
    })

    cache.writeQuery({
      query: NOTIFICATIONS_FOLLOWERS_QUERY,
      data: {
        currentUser: {
          ...currentUser,
          ...reducer(data)
        }
      }
    })
  }
}

const updateFollowersOnToggle = buildCacheUpdater(
  ({ followingToggleNotification: { following2 } }) => {
    return { following2 }
  }
)

export function useEnableNotifications () {
  const [mutate, { loading }] = useMutation(NOTIFICATIONS_ENABLE_MUTATION, {
    update: updateFollowersOnToggle,
    notifyOnNetworkStatusChange: true
  })

  function toggle (id, on) {
    return mutate({
      variables: {
        userId: +id,
        disableNotifications: on
      }
    })
  }

  return { toggle, loading }
}
