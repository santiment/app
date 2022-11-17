import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { updateAmplitude } from 'webkit/analytics/amplitude'
import { setSessionValue } from 'insights/stores/utils'
import { buildRefetcher } from './utils'
import { client } from '../../apollo'

export const USER_QUERY = gql`
  {
    currentUser {
      id
      username # username, unique
      name # user full name, not unique
      email
      avatarUrl
      consentId
      firstLogin
      stripeCustomerId
      marketingAccepted
      privacyPolicyAccepted
      isModerator
      subscription: primaryUserSanbaseSubscription {
        status
        trialEnd
        plan {
          name
          product {
            id
          }
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
      followers {
        count
      }
    }
  }
`

export const refetchUser = buildRefetcher(USER_QUERY)

export function updateUser(newUser) {
  const { currentUser } = client.readQuery({
    query: USER_QUERY,
  })

  const user = newUser && Object.assign({}, currentUser, newUser)
  if (user) updateAmplitude(user.id, user.username, user.email)

  client.writeQuery({
    query: USER_QUERY,
    data: {
      currentUser: user,
    },
  })
}

export function useUser() {
  const query = useQuery(USER_QUERY)

  return useMemo(() => {
    const { loading, data } = query
    const user = data && data.currentUser

    setSessionValue({ currentUser: user })

    return {
      loading,
      user,
      isLoggedIn: !!user,
    }
  }, [query])
}
